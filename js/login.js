$(function () {
    $('#login').on('tap', function () {
        // 拿到用户名密码
        var verify = {
            username: $('#account').val(),
            password: $('#password').val(),
        }
        console.log(verify);

        // 将用户名密码发送给服务器拿到返回值
        $.ajax({
            type: 'post',
            url: 'http://157.122.54.189:9094/api/public/v1/login',
            data: verify,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                // 账号密码正确返回状态码200
                if (result.meta.status == 200) {
                    // 将token值储存到本地
                    sessionStorage.setItem('verify', result.data.token)
                    //登录完成，返回到跳转过来的页面
                    var re = $.getParameter(location.search).redirectUrl
                    if (re) {
                        location.href = unescape(re)
                    } else {
                        location.href = './index.html'
                    }
                } else {
                    // 提示框显示失败说明
                    mui.toast(result.meta.msg)
                }

            }
        })
    })
})