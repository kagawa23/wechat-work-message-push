const request = require('request')

const reqBase = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (!err && ~~res.statusCode < 400) {
                resolve(res)
            } else {
                reject(err || res.statusCode)
            }
        })
    })
}

const req = async function req(options) {
    let tryTimes = 2
    while (tryTimes--) {
        try {
            return await reqBase(options)
        } catch (err) {

        }
    }
}


const postJson = (url, data, proxy = null) => {
    let options = {
        url,
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: data,
        proxy,
        gzip: true,
    }

    return req(options).then((res) => {
        return res
    })
}


const get = (url, proxy = null) => {

    let options = {
        url,
        proxy,
        method: 'GET',
        gzip: true,
    }

    return req(options).then((res) => {
        return res
    })
}

module.exports = {
    req,
    postJson,
    get
}