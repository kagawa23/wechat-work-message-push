### 企业微信消息推送

这个项目很简单，就是在收到http请求后，在企业微信的应用中向某个人发送消息

### 部署
```bash
npm install
```

### 启动
```bash
npm start
```

### 配置示例
将config下的default_example.js重命名为default.js
```javascript
// config/default.js
module.exports = {
    host: '127.0.0.1',
    port: 3000,
    token: 'SAFSAF234',  // token,向后端发送消息的时候需要在header里面带上,如 header['token'] = 'SAFSAF234'

    wechatWork: {
        receiverUserId: 'qy4bj3kb2kj4b2k3b4k34vhg', // 接收者在企业微信中的userid
        corpid: 'ww76510f3cs213gv03b',
        corpsecret: 'SravraDG_sadfvrfrESFveefr-FsaBgsc_QWEFVR23-F4e', // 应用secret
        agentid: '1000001',  // 应用id
    }
}
```

### 发送消息
```http
POST /push/ HTTP/1.1
Host: 127.0.0.1:3000
Content-Type: application/x-www-form-urlencoded
token: sdfaerwersd
Cache-Control: no-cache

message=hello
```