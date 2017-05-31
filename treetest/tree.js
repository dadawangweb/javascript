/**
 * Created by 2017 on 2017/3/3.
 */
function Tree(id,data){
    var tree=document.getElementById(id);
    tree.innerHTML='<ul class="tree-ul"></ul>';
    var ul=document.getElementsByClassName('tree-ul')[0];
    this.init(data,ul);
}
Tree.prototype.init=function(data,ele){
    for(var i=0;i<data.length;i++){
        var l=document.createElement('li');    
        var a=document.createElement('a');
        var t=document.createTextNode(data[i]['name']);
        var _this=this;
        a.appendChild(t);
        a.onclick=function(){
            _this.clickFunc(this);
        }
        var u=document.createElement('ul');
        u.className='child-ul';
        u.index=i;
        if(data[i]['children'].length>0){
            _this.init(data[i]['children'],u);
        }
        l.appendChild(a);
        l.appendChild(u);
        ele.appendChild(l);
    }
}
Tree.prototype.clickFunc=function(obj){
    var next=obj.nextElementSibling;
    if(next.className!=='display-none') {
        next.className = 'display-none';
    }else{
        next.className = '';
    }
}
