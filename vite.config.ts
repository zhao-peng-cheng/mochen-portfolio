import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

/** 视频流式播放插件 — 处理 HTTP Range 请求 + 永久缓存，让浏览器只需加载一次。 */
function videoStreamingPlugin() {
  return {
    name: 'video-streaming',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url || ''
        // 仅处理 public/works 下的视频文件
        if (!url.includes('/works/') || !url.match(/\.(mp4|webm|mov)$/i)) {
          return next()
        }

        // 解析实际文件路径（去掉 query string）
        const cleanUrl = url.split('?')[0]
        const filePath = path.join(process.cwd(), 'public', cleanUrl)

        if (!fs.existsSync(filePath)) {
          return next()
        }

        const stat = fs.statSync(filePath)
        const fileSize = stat.size
        const range = req.headers.range

        // 根据扩展名设置 Content-Type
        const ext = path.extname(cleanUrl).toLowerCase()
        const contentType = ext === '.webm' ? 'video/webm' : 'video/mp4'

        // 生成 ETag（基于文件路径+大小+修改时间）
        const etag = `"${crypto.createHash('md5').update(filePath + fileSize + stat.mtimeMs).digest('hex').slice(0, 16)}"`

        // 永久缓存：immutable 告诉浏览器文件永不变，无需重新验证
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Content-Type', contentType)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.setHeader('ETag', etag)

        // 处理 If-None-Match — 浏览器缓存验证（返回 304 无需重传数据）
        if (req.headers['if-none-match'] === etag && !range) {
          res.writeHead(304, {
            'ETag': etag,
            'Cache-Control': 'public, max-age=31536000, immutable',
          })
          res.end()
          return
        }

        if (range) {
          // 处理 Range 请求 — 返回 206 Partial Content
          const parts = range.replace(/bytes=/, '').split('-')
          const start = parseInt(parts[0], 10)
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
          const chunkSize = end - start + 1

          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'ETag': etag,
          })

          const stream = fs.createReadStream(filePath, { start, end })
          stream.on('error', () => {
            if (!res.headersSent) next()
          })
          stream.pipe(res)
        } else {
          // 无 Range 请求 — 返回完整文件
          res.writeHead(200, {
            'Content-Length': fileSize,
            'Accept-Ranges': 'bytes',
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'ETag': etag,
          })

          const stream = fs.createReadStream(filePath)
          stream.on('error', () => {
            if (!res.headersSent) next()
          })
          stream.pipe(res)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), videoStreamingPlugin()],
  server: {
    host: true,
    port: 5173,
  },
})
