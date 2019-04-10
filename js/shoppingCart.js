$(function () {
    // 获取数据生成动态结构
    $.ajax({
        type: 'get',
        url: 'http://157.122.54.189:9094/api/public/v1/my/cart/all',
        dataType: 'json',
        headers: {
            "Authorization": sessionStorage.getItem('verify')
        },
        success: function (result) {
            console.log(result);
            // 如果接受得数据是token过期，则重定向去登录
            var data = JSON.parse(result.data.cart_info)
            console.log(data);

            var html = template('orderTemp', { list: data })
            $('.order_list').html(html)

            // 重新对number-box进行初始化，否则不能使用
            mui('.pyg_userNum').numbox()

            // 初始化区域滚动
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                indicators: false //是否显示滚动条，默认为True
            });

            commAllPrice()
        }
    })

    // 单击编辑
    $('.mui-pull-right').on('tap', function () {
        if ($(this).text() == '编辑') {
            // 设置文本内容
            $(this).text('完成')
            $('.mui-pull-left').removeClass("disno");
            $('.mui-checkbox').removeClass("disno");
        } else {
            $(this).text('编辑')
            $('.mui-pull-left').addClass("disno");
            $('.mui-checkbox').addClass("disno");
            syncCart($('.order-singer'))
        }
    })

    // 计算总价
    function commAllPrice() {
        var total = 0
        // 所有商品列表
        var allOrders = $('.order-singer')

        allOrders.each(function (index, value) {
            // 商品价格
            var price = $(value).data('order').goods_price
            // 商品数量
            var num = $(value).find('#test').val()
            // 将所有的价格叠加到total
            total = total + (price * num)
        })
        // 赋值到元素
        $('.price').text('￥ ' + total)
    }
    // 单击修改数量重新计算价格
    $('.order_list').on('tap', '.pyg_userNum .mui-btn', function () {
        commAllPrice()
    })

    // 同步购物车
    // 传进来的参数就是你要同步的数据
    function syncCart(allList) {
        var list_obj = {}
        // 遍历所有商品列表
        for (var i = 0; i < allList.length; i++) {
            // 拿到所有商品列表的信息（商品信息存放在自定义属性）
            var data = $(allList[i]).data('order');
            // 将页面的数量给到data
            data.amount = $(allList[i]).find('#test').val()
            // data.goods_price = '德玛西亚'
            // 后台需要的数据是键值对
            list_obj[data.goods_id] = data
        }
        console.log(list_obj);
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: 'http://157.122.54.189:9094/api/public/v1/my/cart/sync',
            data: { infos: JSON.stringify(list_obj) },
            headers: {
                "Authorization": sessionStorage.getItem('verify')
            },
            success: function (result) {
                console.log(result)
            }
        })

    }
})