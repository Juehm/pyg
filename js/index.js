$(function () {
    // 发送ajax渲染轮播图
    $.ajax({
        type: 'get',
        url: 'http://157.122.54.189:9094/api/public/v1/home/swiperdata',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = template('pyg_bannerTemp', result)
            $('.mui-slider-group').html(html)

            //获得slider插件对象
            mui('.mui-slider').slider({
                interval: 2000      //自动轮播周期，若为0则不自动播放，默认为0；
            })
        }
    })
    $.ajax({
        type:'get',
        url:'http://157.122.54.189:9094/api/public/v1/home/goodslist',
        dataType:'json',
        success:function(result){
            console.log(result);
            
            var html=template('pyg_commodity',result)   
            $('.commodity').html(html)
            
        }
    })

 


})