//扩展jQuery 的方法
(function(){

       $.fn.waterFall=function(){
                /*
                * 我要对瀑布流里面的所有的元素进行定位.
                * item 进行定位.
                * 这些item 都是position 绝对定位，我们就是要计算出每一个item 的left top
                * */
               var $item=$(this);

               var parentWidth=$item.width();

               var childrens=$item.children()

               //计算出每个子盒子的宽度
               var width=childrens.width();

               var column=5;

               var space=(parentWidth-column*width)/(column-1);

               var colArray=[];

               childrens.each(function(index,dom){
                      var $dom=$(dom);
                      /*
                      * 分为两种情况
                      * */
                      //对第一行进行定位
                      if(index<column){
                             //0,1,2,3,4
                          $dom.css({
                               top:"0",
                               left:index*(width+space)
                          })
                          //第一行出来了.
                          colArray[index]=$dom.height();
                      }else{
                          /*
                          * 我要定位下一个元素.
                          * 我就需要计算出第六个元素对应的left:  top
                          * 换一句话我要找到最矮的那一列inde 以及 height
                          * */
                          /*
                          * 计算出来最矮的那一列的索引，以及对应的高度.
                          * */
                          var minIndex=0;
                          var minHeight=colArray[0];

                          //从数组里面找到最矮的那一列的索引，以及高度.
                          for(var j=0;j<colArray.length;j++){
                                if(minHeight>colArray[j]){
                                     minIndex=j;
                                     minHeight=colArray[j];
                                }
                          }

                          $dom.css({
                               left:minIndex*(width+space),
                               top: minHeight+space
                          })


                          colArray[minIndex]=minHeight+space+$dom.height();

                      }
                      //对其它的行进行的定位
               })

                var maxHeight=colArray[0];

                for(var j=0;j<colArray.length;j++){
                      if(maxHeight<colArray[j]){
                          maxHeight=colArray[j];
                      }
                }
                console.log(maxHeight);
                $item.height(maxHeight);

       }
})();