/**
 * Created by dadawang on 2016/10/3.
 */
//----------------------------------函数库  你要用里面的函数只需在文档中script引入就可以使用了


//------------根据class获取元素对象函数------------类似jquery中的
function getByClass(className,context) {
    context = context || document;
    if(context.getElementsByClassName){
        return context.getElementsByClassName(className);
    }
    var nodes = context.getElementsByTagName('*'),ret = [];
    for (var i = 0;i < nodes.length;i++){
        if(hasClass(nodes[i],className)) ret.push(nodes[i]);
    }
    return ret;
}

function hasClass(node,className) {
    var names = node.className.split(/\s+/);
    for(var i = 0; i<names.length;i++){
        if(naems[i]==className) return true;
    }
    return false;
}


//----------让轮播动起来的动画函数------------------------
function animate(o,start,alter,dur,fx) {
    var curTime = 0;
    var t = setInterval(function () {
        if(curTime>=dur) clearTimeout(t);
        for(var i in start){
            o.style[i] = fx(start[i],alter[i],curTime,dur)+"px";
        }
        curTime+=50;
    },50);
}

function Linear(start,alter,curTime,dur) {
    return start+curTime/dur*alter;
}//最简单的线性变化，即匀速运动

function Quad(start,alert,curTime,dur) {
    return start+Math.pow(curTime/dur,2)*alert;
}