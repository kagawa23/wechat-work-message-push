const crypto = require('crypto')
const config = require('config')

const req = require('./utils/request')

let tokenData = {}

class WechatWork {
    async getToken() {
        if (!(tokenData.getTime && (tokenData.getTime + 7000 * 1000) > Date.now())) {
            let data = {
                corpid: config.wechatWork.corpid,
                corpsecret: config.wechatWork.corpsecret
            }
            let keys = Object.keys(data)
            let str = keys.map(key => {
                return `${key}=${data[key]}`
            }).join('&')
            let url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?' + str
            let res = await req.get(url)
            tokenData = JSON.parse(res.body)
            tokenData.getTime = Date.now()
            console.log(new Date() + ':new token:' + tokenData.access_token)
        }
        return tokenData.access_token
    }

    async sendMessage(userID, content) {
        let data = {
            touser: userID,
            msgtype: 'text',
            agentid: config.wechatWork.agentid,
            text: { content }
        }
        let token = await this.getToken()
        let url = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${token}`
        let data2 = await req.postJson(url, data)
    }
}

module.exports = WechatWork