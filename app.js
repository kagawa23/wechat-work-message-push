const config = require('config')
const Koa = require('koa')

const router = require('./router')

const app = new Koa()
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port, config.hostname)