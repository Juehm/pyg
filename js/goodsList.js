$(function () {
    // 点击小图标显示隐藏右边导航元素
    $('#offCanvasBtn').on('tap', function () {
        mui('.mui-off-canvas-wrap').offCanvas().toggle();
    })

    var ddd = {
        query: '',
        cid: getParameter(location.search).cid,
        pagenum: 1,
        pagesize: 10
    }
    console.log(getParameter(location.search).cid);

    function render(callback) {
        $.ajax({
            type: 'get',
            url: 'http://140.143.222.79:8899/api/public/v1/goods/search',
            data: ddd,
            dataType: 'json',
            success: function (result) {
                // var html = template('goList', result.data)
                // $('.mui-table-view').html(html)
                // console.log(result)
                callback(result)
            }
        })
    }

    // 下拉上拉效果初始化
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    ddd.pagenum = 1
                    render(function (result) {
                        var html = template('goList', result.data)
                        $('.mui-table-view').html(html)
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: false,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    ddd.pagenum++
                    render(function (result) {
                        if (result.data.goods.length > 110) {
                            var html = template('goList', result.data)
                            console.log(html);       
                            $('.mui-table-view').append(html)
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            console.log(result.data.goods.length); 
                        }else{
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }

                    })
                    // if()
                    // setTimeout(() => {
                    //     this.endPullupToRefresh(false)
                    // }, 1000)
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    })



    var url = '?id=1&name=mo'

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
})