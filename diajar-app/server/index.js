import express from 'express'
import httpErrors from 'http-errors'
import pino from 'pino'
import pinoHttp from 'pino-http'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import apiRouter from './routes/api.js'

dotenv.config()

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

let serverStarted = false
let serverClosing = false

function unhandledError (err) {
  logger.error(err)
  if (serverClosing) return
  serverClosing = true
  if (serverStarted) {
    server.close(function () {
      process.exit(1)
    })
  }
}
process.on('uncaughtException', unhandledError)
process.on('unhandledRejection', unhandledError)

function createApp () {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
  app.use(express.json({ limit: '100kb' }))
  app.use(express.urlencoded({ extended: true, limit: '100kb' }))
  app.use(pinoHttp({ logger }))

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  }))

  app.use('/api/v1', apiRouter)

  app.use(function fourOhFourHandler (req, res, next) {
    next(httpErrors(404, `Route not found: ${req.method} ${req.url}`))
  })

  app.use(function fiveHundredHandler (err, req, res, next) {
    if (err.status >= 500) logger.error(err)
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      errors: err.errors || null
    })
  })

  return app
}

let server

export function start (opts, cb) {
  const ready = cb || function () {}
  const config = Object.assign({ port: process.env.PORT || 4000, host: process.env.HOST || 'localhost' }, opts)

  server = createApp().listen(config.port, config.host, function (err) {
    if (err) return ready(err)
    if (serverClosing) return ready(new Error('Server was closed before it could start'))
    serverStarted = true
    const addr = server.address()
    logger.info(`Started at ${config.host || addr.address || 'localhost'}:${addr.port}`)
    ready()
  })
  return server
}

export function stop (cb) {
  const done = cb || function () {}
  serverClosing = true
  if (server) server.close(() => done())
  else done()
}

const isMain = process.argv[1] && process.argv[1].endsWith('index.js')
if (isMain) {
  start({ port: process.env.PORT, host: process.env.HOST })
}
