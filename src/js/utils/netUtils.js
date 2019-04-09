import * as Api from '../api/Api'
import moment from 'moment'
function isImage(file) {
    return file['type'].split('/')[0] === 'image'
}

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
            console.log(options.method)
            req.open(options.method, url /*+ '?_=' + new Date().getTime()*/)
        }
        req.setRequestHeader('Content-Type', 'application/json')
        if (window.empty.check(token)) {
            req.setRequestHeader('Authorization', `Bearer ${token}`)
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
/**
 * 获取签名
 * @param options  method,pathname
 * @param callback
 */
// export function getAuthorization(options,callback){
//     var method = (options.Method || 'get').toLowerCase();
//     var key = options.Key || '';
//     var pathname = key.indexOf('/') === 0 ? key : '/' + key;
//     var url = Api.API_GET_AUTHORIZATION+'?method=' + method + '&pathname=' + encodeURIComponent(pathname);
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onload = function (e) {
//         callback(null, e.target.responseText);
//     };
//     xhr.onerror = function (e) {
//         callback('获取签名出错');
//     };
//     xhr.send();
// }


export function getUrlParam(urlString,name) {
    if(!urlString) return ''
    let url = ''
    let param = ''
    try {
        url = new URL(urlString)
        param = url.searchParams.get(name)
    }catch(err) {
        console.warn(err)
    }
    return param
}

