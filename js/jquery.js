/**
 * Created by dadawang on 2016/10/6.
 */
//自己写的jquery
(function (window,undefiend) {
    //--------------------------jquery变量声明------------------------------------------------
    var jQuery = function (selector,context) {
        return new jQuery.fn.init(selector,context);
    },
        _jQuery = window.jQuery,

        _$ = window.$,

        document = window.document;  //后面还有好多的变量



    //---------------------------jqeury方法 -------------------------------------------------------
    //没写出来的eq  first ready animated last not ....
    jQuery.fn = jQuery.prototype = {     //给jQuery增加一个fn对象
        init : function (selector, context) {
            var match,elem,ret,doc;
        },

        //--------------------jquery对象访问-------
        selector:"",

        jquery:"1.4.2",   //jquery版本号

        length:0,

        each:function (callback,args) {
            return jQuery.each(this,callback,args);
        },

        size:function () {
            return this.length;
        },

        toArray:function () {
            return slice.call(this ,0);
        },

        get:function (num) {
            return num == null ?
                this.toArray():
                (num < 0 ? this.slice(num)[0] : this[num]);
        }

    };
    jQuery.fn.init.prototype = jQuery.fn;

    //------------------------jquery插件开发----------
    //插件扩展jquery对象
    // jQuery(document);   //jquery.fn.init的实例
    // jQuery.trim();      //jquery的静态方法
    // jQuery.newMethod = function () {};  //静态方法
    // jQuery.newMethod();
    //
    // jQuery.fn.init.prototype.newMethod = function () {}; //这种涉及了jquery内部构造 要理解了才能添加 但是插件就不需要考虑内部结构 直接可以添加方法
    jQuery.extend = jQuery.fn.extend = function () {

        //这里面是源码
        /*
         　　*target被扩展的对象
         　　*length参数的数量
         　　*deep是否深度操作
         　　*/
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
        // deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
        // 然后把第二个参数赋值给target
        if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};

            // 将i赋值为2，跳过前两个参数
            i = 2;
        }

        // target既不是对象也不是函数则把target设置为空对象。
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
            target = {};
        }

        // 如果只有一个参数，则把jQuery对象赋值给target，即扩展到jQuery对象上
        if ( length === i ) {
            target = this;

            // i减1，指向被扩展对象
            --i;
        }

        // 开始遍历需要被扩展到target上的参数

        for ( ; i < length; i++ ) {
            // 处理第i个被扩展的对象，即除去deep和target之外的对象
            if ( (options = arguments[ i ]) != null ) {
                // 遍历第i个对象的所有可遍历的属性
                for ( name in options ) {
                    // 根据被扩展对象的键获得目标对象相应值，并赋值给src
                    src = target[ name ];
                    // 得到被扩展对象的值
                    copy = options[ name ];

                    // 这里为什么是比较target和copy？不应该是比较src和copy吗？
                    if ( target === copy ) {
                        continue;
                    }

                    // 当用户想要深度操作时，递归合并
                    // copy是纯对象或者是数组
                    if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        // 如果是数组
                        if ( copyIsArray ) {
                            // 将copyIsArray重新设置为false，为下次遍历做准备。
                            copyIsArray = false;
                            // 判断被扩展的对象中src是不是数组
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            // 判断被扩展的对象中src是不是纯对象
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // 递归调用extend方法，继续进行深度遍历
                        target[ name ] = jQuery.extend( deep, clone, copy );

                        // 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
        // 原对象被改变，因此如果不想改变原对象，target可传入{}
        return target;
    }
    jQuery.extend({
        //------这里不是noConflict声明 他的声明不在这里 不知道是不是jquery里-----------------
        noConflict:function (deep) {
            window.$ = _$;

            if(deep){
                window.jQuery = _jQuery;
            }

            return jQuery;
        },
        //--------------这里也不是ready()的声明 他的声明在jquery里--------------
        isReady:false,
        ready:function () {
            if(!jQuery.isReady){
                if(!document.body){
                    return setTimeout(jQuery.ready, 13);
                }

                jQuery.isReady = true;

                if(readyList){
                    var fn, i = 0;
                    while((fn = readyList[i++])){
                        fn.call(document, jQuery);
                    }
                    readyList = null;
                }

                if(jQuery.fn.triggerHandler){
                    jQuery(document).triggerHandler("ready");
                }
            }
        },
    });


    //---------------------------jQuery事件   绑定bind()  one()。。。------------------
    jQeury.each(["bind", "one"],function(i,name){
        //这里面是源码
    });
})(window);