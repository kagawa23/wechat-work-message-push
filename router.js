const Router = require('koa-router')
const router = new Router()
const config = require('config')
const bodyParser = require('koa-body')

const WechatWork = require('./wechatWork')

router.post('/push/', bodyParser(), async (ctx, next) => {
    let parmas = ctx.request.body
    let headers = ctx.request.headers
    if (headers['token'] != config.token) {
        console.log('Incorrect token:' + headers['token'])
        ctx.res.statusCode = 401
        ctx.res.write('Incorrect token')
        ctx.res.end()
        return false
    }
    data = {
        message: parmas.message
    }

    let wechatWork = new WechatWork()
    wechatWork.sendMessage(config.wechatWork.receiverUserId, data.message)

    ctx.body = data.message

})

router.get('/health/', async (ctx, next) => {
    ctx.body = 'OK'
})

module.exports = router