/**
 * Created by dadawang on 2016/10/5.
 */
(function () {
        function isVisible(o) {                //这就是第三条  判断内容是否可见  返回可见
            var offset = getOffset(o),de=document.documentElement;   //前一句代码获取当前元素的位置   后一条获取页面的属性
            return offset.x<de.scrollLeft+de.clientWidth &&
                    offset.y<de.scrollTop+de.clientHeight;
        }
        //---------------这个方法就就滚动加载了  加载下一屏---------------
        /*
        * 先分析  1.用户滚动条向下拉的时候才加载   定性问题
        * 2.只有当用户快看到第一屏的结尾的时候才加载 时机问题  用户不去看下面的 就无需从服务器请求加载了不
        * 3.我们不应该根据滚动条的距离来判断加载  而真正应该做的是根据内容来判断什么时候加载  比如说一个临界内容
        * 4.总结 ：一刚开始你加载了一屏  然后你选一个不可见的临界元素  当用户滚动下滑  那个临界元素变为可见  重新加载
        * */

        var lock; //阻塞标志  很重要   避免并发加载 就是如果服务器响应慢的话一直加载问题
        addEvent(widows,"load",function () {

            insert(1,25);          //这里加载第一屏
            var interval=setInterval(function () {
                if(lock) return;
                window.scrollTo(0,0);
                addEvent(widows,"scroll",function () {         //主要就是这个事件了
                    if (lock) return false;
                    //在这里配合上面的isVisible 来实现重新请求加载
                    if (isVisible()) {
                        insert(); //这里面放时机元素 就OK了 下面就重新加载后面的东西了

                    }
                });
                clearInterval(interval);
            },100);
        });


        //-------------这个函数的作用是加载第一屛---------------------------还可以用于加载其他的  必须也能同时加载其它的------
        function insertData(start,length) {
            lock=true;
            var table = $("mottoTable");    //因为要插入到表格中
            Base.ajax({
                url:"proxy.php",       //能返回数据的后台
                data:{
                    start:start,           //数据的开始 和数据长度 不同保存格式的数据 取数据的方法可能不同 所以才要和后台统一接口
                    length:length
                },
                success:function (txt) {
                    var data = eval(("+txt+"));
                    for (var i = 0,row,cell;i<data.length;i++){          //row cell  表格对象的属性
                        row = table.insertRow(table.rows.length);        //值已经取出来了 接下来就写插入细节了咯  so easy
                        cell = row.insertCell(row.cells.length);
                        cell.innerHTML = data[i].man;
                        cell = row.insertCell(row.cells.length);
                        cell.innerHTML = data[i].text;
                    }
                }
            });
        }
    }
)();