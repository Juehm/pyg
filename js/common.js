
$(function () {
    // 默认情况 下，mui不响应click单击事件，这是它的默认行为
    // 我们解决方式就是重新为所有A绑定tap
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });

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
    $.getParameter = getParameter
})