import $ from 'jquery'

/**
 * 弹出框
 * @param str
 */
window.alert = function (str) {
    $('input').blur()
    let strHtml = `<ul style="list-style:none;margin:0px;padding:0px;width:100%;box-shadow: 0 0 6px #CDD7E0;border-radius: 10px">
    <li style="background:#fff;text-align:center;font-size:14px;height:95px;line-height:95px;border-top-left-radius: 10px;border-top-right-radius: 10px">${str}</li>
    <li style="background:#fff;text-align:center;font-weight:bold;height:40px;line-height:35px; color:#fff;"><input type="button" value="确 定" onclick="doOk()" style="width:80px;height:30px;background:#F5222D;color:white;font-size:16px;line-height:30px;outline:none;margin-top: 4px;border-radius: 5px;border: 0"/></li>
    <li style="background:#fff;font-size:16px;font-weight:bold;height:10px;line-height:20px;color:#000;text-align: center;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px"></li></ul>`
    let shield = document.getElementById('shield')
    let alertFram = document.getElementById('alertFram')
    if(shield === null || alertFram === null) {
        shield = document.createElement('DIV')
        shield.id = 'shield'
        shield.style.position = 'fixed'
        shield.style.left = 0
        shield.style.top = 0
        shield.style.width = '100%'
        shield.style.height = '100%'
        shield.style.zIndex = '1000000'
        shield.style.overflow = 'none'
        alertFram = document.createElement('DIV')
        alertFram.id = 'alertFram'
        alertFram.style.position = 'fixed'
        alertFram.style.width = '280px'
        alertFram.style.height = '150px'
        alertFram.style.left = '50%'
        alertFram.style.top = '50%'
        alertFram.style.marginLeft = '-140px'
        alertFram.style.marginTop = '-110px'
        alertFram.style.textAlign = 'center'
        alertFram.style.lineHeight = '150px'
        alertFram.style.zIndex = '10000001'
        alertFram.innerHTML = strHtml
        document.body.appendChild(alertFram)
        document.body.appendChild(shield)
        alertFram.focus()
    }else {
        alertFram.innerHTML = strHtml
        alertFram.style.display = 'block'
        shield.style.display = 'block'
    }
    window.doOk = function () {
        if (alertFram.style.display !== 'none' || shield.style.display !== 'none') {
            alertFram.style.display = 'none'
            shield.style.display = 'none'
        }
    }
}
//范例confirm("str",function(choose){
// if(choose===true){
// }else{
// }
// })

/**
 *
 * @param str
 * @param callback
 * @param text 确认框要显示的文字
 * 示例：
 * confirm("str",function(choose){
     if(choose===true){}else{}
        })
 */
window.confirm = function (str, callback, text) {
    $('input').blur()
    let strHtml = `<ul style="list-style:none;margin:0px;padding:0px;width:100%;box-shadow: 0 0 6px #CDD7E0;border-radius: 10px">
    <li style="background:#fff;text-align:center;font-size:14px;line-height:35px;color:#000;border-top-left-radius: 10px;border-top-right-radius: 10px;padding-left: 10px;padding-right: 10px;padding-top: 20px;padding-bottom: 18px">${str}</li>
    <li style="background:#fff;text-align:center;font-weight:bold;height:40px;line-height:35px; color:#fff;"><input type="button" value="取 消" onclick="doNok1()" style="width:80px;height:30px;background:#fff;color:#722ED1;font-size:16px;line-height:30px;outline:none;margin-top: 4px;border-radius: 5px;box-shadow: 0 3px 6px #CDD7E0;border: 1px solid #722ED1"/><input type="button" value="${text ? '确 定' : '删 除'}" onclick="doOk1()" style="width:80px;height:30px;background:#F5222D;margin-left: 40px;color:white;font-size:16px;line-height:30px;outline:none;margin-top: 4px;border-radius: 5px;border: 0;box-shadow: 0 3px 6px #CDD7E0;"/></li>
    <li style="background:#fff;font-size:16px;font-weight:bold;height:20px;line-height:20px;color:#000;text-align: center;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px"></li>
    </ul>`
    let confirmShield = document.getElementById('confirmShield')
    let confirmFram = document.getElementById('confirmFram')
    if(confirmShield === null || confirmFram === null) {
        confirmShield = document.createElement('DIV')
        confirmShield.id = 'confirmShield'
        confirmShield.style.position = 'fixed'
        confirmShield.style.left = 0
        confirmShield.style.top = 0
        confirmShield.style.width = '100%'
        confirmShield.style.height = '100%'
        confirmShield.style.zIndex = '1000000'
        confirmShield.style.overflow = 'none'
        confirmFram = document.createElement('DIV')
        confirmFram.id = 'confirmFram'
        confirmFram.style.position = 'fixed'
        confirmFram.style.width = '360px'
        confirmFram.style.height = '190px'
        confirmFram.style.left = '50%'
        confirmFram.style.top = '50%'
        confirmFram.style.marginLeft = '-140px'
        confirmFram.style.marginTop = '-110px'
        confirmFram.style.textAlign = 'center'
        confirmFram.style.lineHeight = '150px'
        confirmFram.style.zIndex = '10000001'
        confirmFram.innerHTML = strHtml
        document.body.appendChild(confirmFram)
        document.body.appendChild(confirmShield)
        confirmFram.focus()
    }else {
        confirmFram.innerHTML = strHtml
        confirmFram.style.display = 'block'
        confirmShield.style.display = 'block'
    }
    window.doOk1 = function () {
        if (callback && typeof callback === 'function') {
            callback(true)
            confirmFram.style.display = 'none'
            confirmShield.style.display = 'none'
            return callback
        }
    }
    window.doNok1 = function () {
        if (callback && typeof callback === 'function') {
            callback(false)
            confirmFram.style.display = 'none'
            confirmShield.style.display = 'none'
            return callback
        }
    }
}

/**
 * 提示框
 * @param str
 * @param state,默认ok
 * 示例
 * alert_wait("success","ok")
 * alert_wait("error","nok")
 */
window.alert_wait = function (str, state) {
    $('input').blur()
    let bgColor = '#fff'
    // let bgColor = '#f6ffed'
    // let borderStyle = '1px solid #b7eb8f'
    let icon = '#iconcheck-circle-fill'
    let fillColor = '#52c41a'
    if (state === 'nok') {
        // bgColor = '#fff1f0'
        // borderStyle = '1px solid #ffa39e'
        icon = '#iconclose-circle-fill'
        fillColor = '#f5222d'
    } else if (state === 'ok') {

    }
    let alertFram1 = document.createElement('div')
    alertFram1.id = 'alertFram1'
    alertFram1.className = 'alert-wait'
    alertFram1.style.background = bgColor
    // alertFram.style.border = borderStyle
    alertFram1.innerHTML = `<svg class="icon-check" style="fill: ${fillColor}" aria-hidden="true">
                                   <use xlink:href=${icon}></use>
                           </svg>
                           <span>${str}</span>`
    document.body.appendChild(alertFram1)
    setTimeout(function () {
        alertFram1.style.animation = 'outMove 1s'
        setTimeout(function () {
            alertFram1.style.display = 'none'
        },1000)
    }, 2000)
}