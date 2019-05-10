function createURL(path, param/*链接和参数*/) {
    let i, url = ''
    for (i in param) url += '&' + i + '=' + param[i]
    return path + url.replace(/./, '?')
}

/**
 * 自定义Fetch
 */
export function myFetch(url, options, token) {
    return new Promise(function (resolve, reject) {
        options.method.toUpperCase()
        var req = new XMLHttpRequest()
        if (options.method === 'GET') {
            let _url = createURL(url,options.body)
            // if(_url.indexOf('?')>-1){
            //     _url+='&_='+new Date().getTime()
            // }else{
            //     _url+='?_='+new Date().getTime()
            // }
            req.open(options.method, _url)
        } else {
            req.open(options.method, url /*+ '?_=' + new Date().getTime()*/)
        }
        req.setRequestHeader('Content-Type', 'application/json')
        if (window.empty.check(token)) {
            req.setRequestHeader('Authorization', `${token}`)
        }
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response)
            }
            else {
                reject(Error(req.statusText))
            }
        }
        req.onerror = function () {
            reject(Error('Network Error'))
        }
        if (options.method !== 'GET') {
            req.send(JSON.stringify(options.body))
        } else {
            req.send()
        }
    })
}


