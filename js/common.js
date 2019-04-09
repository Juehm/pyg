// 将url的参数解析成对象 函数封装
function getParameter(url) {
    var obj = {}
    url = url.substring(1)
    var arr = url.split('&')
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split('=')
        obj[temp[0]] = temp[1]
    }
    return obj

}
$.getParameter=getParameter