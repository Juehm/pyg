$(function(){
    
    var lsData
    function render(){

        lsData=JSON.parse(localStorage.getItem('cateData'))
       console.log(lsData);
       
        if(lsData&&(Date.now()-lsData.time)< 24*60*60*1000){
            leftdata()
            rightdata(0)
        }else{
            ajaj()
        }
    }
    render()


    var cateData

    function ajaj(){
        $.get('http://157.122.54.189:9094/api/public/v1/categories',function(result){

            cateData={'list':result.data,'time':Date.now()}
            localStorage.setItem('cateData',JSON.stringify(cateData))
            leftdata()
            rightdata(0)
        },'json')
    }
    
    function leftdata(){    
        var htmlnav=template('sideNav',lsData)
        $('.conleft ul').html(htmlnav)
        var iscroll = new IScroll('.conleft')

        // 为左侧所有的li绑定单击操作
        $('.conleft').on('tap','li',function(){
            // 单击改元素让他置顶
            iscroll.scrollToElement(this)

            var index=$(this).index()
            rightdata(index)
        })
        
    }
    function rightdata(index){

        var htmlmain=template('maincon',lsData.list[index])  
            $('.scroll').html(htmlmain)

            var imgcount =$('.scroll img').length
            
            $('.scroll img').on('load',function(){
                imgcount--         
                if (imgcount==1){
                    var iscrollhh = new IScroll('.conright')          
                }
            })
           
    }

    
    

})