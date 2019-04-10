$(function () {

    var info = {
        cat_id:'',
        goods_id:'',
        goods_name:'',
        goods_number:'',
        goods_price:'',
        goods_small_logo:'',
        goods_weight:''
    }
    // $.ajaxSettings.beforeSend = function (xhr) {
    //         xhr.setRequestHeader('Authorization',sessionStorage.getItem('verify'))
    // }; 
    $.ajax({
        type: 'get',
        url: 'http://157.122.54.189:9094/api/public/v1/goods/detail',
        data: '?goods_id=43986',
        dataType: 'json',
        // headers: { 
        //     "Authorization":sessionStorage.getItem('verify')
        // },
        success: function (result) {

             // 为info赋值
             info.cat_id = result.data.cat_id
             info.goods_id = result.data.goods_id
             info.goods_name = result.data.goods_name
             info.goods_number = result.data.goods_number
             info.goods_price = result.data.goods_price
             info.goods_small_logo = result.data.goods_small_logo
             info.goods_weight = result.data.goods_weight

            // 调用模板引擎渲染页面
            var html = template('contenr', result.data)
            $('.mui-scroll').html(html)

            //轮播图初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 主内容滑动块初始化
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                indicators: false //是否显示滚动条，默认为True
            });
        }
    })

    // 加入购物车业务
    $('.mui-btn-danger').on('tap', function () {     
        // 查看登录状态（登录状态由本地存储）
        if (!sessionStorage.getItem('verify')) {
            // 如果没登录则跳转到登录页。url参数带上本页地址，方便登录完成则返回本页
            location.href = './login.html?redirectUrl=' + escape(location.href)
        }else{
            // 如果已登录则添加到购物侧业务购物车页
            $.ajax({
                type:'post',
                url:'http://157.122.54.189:9094/api/public/v1/my/cart/add',
                data:{info:JSON.stringify(info)},
                dataType:'json',
                headers: { 
                    "Authorization":sessionStorage.getItem('verify')
                },
                success:function(result){
                    console.log(result);   
                    if(result.meta.status==401){
                        mui.toast('登录已过期，请重新登录');
                        location.href = './login.html?redirectUrl=' + escape(location.href)      
                    } else{
                        mui.confirm('添加成功，是否查看购物车？', '温馨提示', ['跳转', '取消'], function (e) {
                            // index代表当前按钮的索引，索引从0开始
                            if (e.index == 0) {
                                // 跳转到购物车页面
                                location.href='shoppingCart.html'
                            }
                        });       
                    }
                }
            })
        }
    })
})