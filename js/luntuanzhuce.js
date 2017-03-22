/**
 * Created by dadawang on 2016/10/4.
 */
//------------------------本来整个程序都已经实现了 但是被我改出bug了  找不到了  唉  时间有限 不折腾了----------------------------------------------------------------------------
window.onload = function () {
    var fm = document.getElementById('regForm');


    focusblur();
    //-----------------------------鼠标聚焦与失焦-----------------------------------------
    function focusblur() {
        var inputs = fm.elements;
        document.getElementById('otherHobbyLabel').style.display="none";
        for(var i = 0;i < inputs.length;i++){
            if(inputs[i].type == 'text' || inputs[i].type =='password'){
                inputs[i].noticeNode = inputs[i].parentNode.getElementsByTagName('em')[0];
                inputs[i].warningNode = inputs[i].parentNode.getElementsByTagName('strong')[0];
                if(!inputs[i].noticeNode) continue;
                inputs[i].onfocus=function () {
                    if (!this.noticeNode) return;
                    this.noticeNode.style.display="inline";
                    this.warningNode.style.display="none";
                };
                inputs[i].onblur=function () {
                    this.noticeNode.style.display="none";
                };
            }
        }
        //勾选其它爱好菜把其他爱好显示
        var otherHobbyLabel = document.getElementById('otherHobbyLabel')
        var otherHobbyCheckbox = document.getElementById('other');
        otherHobbyCheckbox.onclick=function () {
            if(this.checked){
                otherHobbyLabel.style.display="block";
            }
            else{
                otherHobbyLabel.style.display="none";
            }
        };

        //-----------------------------年  月  日---------------------------------------------------
        var  by = fm.birthYear,
              bm = fm.birthMonth,
              bd = fm.birthDay;
        //当用户先选了月的时候  要根据年来改变日
        by.onchange =function () {
            var y = +this.value,m=bm.value;
            if(m!=2){
                return;
            }
            if(isoverYear(y) && bd.options.length!=30){
                bd.options.length=29;
                bd.add(new Option(29,29),null);
            }else if(bd.options.length!=29){
                bd.options.length=29;
            }
        };
        //显示年   你想显示多少就更改1980和2000就可以了  其实你要实现其他的就更改这里就可以了  其它都做好了
        for(var i = 1980;i<=2000;i++){
            by.add(new Option(i,i),null);
        }
        //月     根据月 平年闰年 来做日
        for(var i=1;i<13;i++){
            bm.add(new Option(i,i),null);
        }
        var m30 = {4:1,6:1,9:1,11:1};

        bm.onchange=function () {
            var m= this.value;
            bd.options.length=1;
            if(m==2){
                var y=+by.value,d;
                if(!y || isoverYear(y)){
                    d = 29;
                }else d = 28;
                for(i = 1;i<=d;i++){
                    bd.add(new Option(i,i),null);
                }
            }else if(m in m30){
                for(i = 1;i<31;i++){
                    bd.add(new Option(i,i),null);
                }
            } else{
                for(i = 1;i<=31;i++){
                    bd.add(new Option(i,i),null);
                }
            }
        }
        //判断是不是闰年 闰年  能被4整除  不能被100整除  29天
        function isoverYear(y) {
            return (y%4 ==0 && y%100 !==0) || y%400==0;
        }

        //---------当前输入多少字  还能输入多少字------------这里有一个bug 用户粘贴会出错
        var textarea = fm.motto,
             curLenSpan =document.getElementById('curLen'),
             maxLenSpan =document.getElementById('maxLen'),
             leftLenSpan =document.getElementById('leftLen'),
             maxLen = +maxLenSpan.innerHTML,
            textareaLimit = document.getElementById('textareaLimit'),
             curLen = textarea.value.length,
             leftLen = maxLen - curLen;

        
             curLenSpan.innerHTML =curLen ;
             leftLenSpan.innerHTML = leftLen;
            textareaLimit.style.display='inline';

            textarea.onkeyup=function () {
                curLen=this.value.length;
                if(curLen>=maxLen){
                    this.value=this.value.substring(0,maxLen-1);
                    curLen=maxLen;
                }
                leftLen = maxLen-curLen;
                curLenSpan.innerHTML =curLen ;
                leftLenSpan.innerHTML = leftLen;
            };
        // textarea.oppaste=function () {           让一个控件不能粘贴  粘贴事件
        //     return false;
        // }


        //---------------------表单验证--------------------
        fm.onsubmit=function (evt) {
            //先阻止浏览器默认跳转行为，然后验证
            if(evt){//w3c
                evt.preventDefault();
            }else{
                evt.returnValue=false;
            }
            var userName = fm.userName.value;//检测用户名

            if(!/^\w{2,16}$/.test(userName)){
                fm.userName.focus();
                fm.userName.warningNode.style.display='inline';
                return;
            }
            fm.userName.warningNode.style.display='none';

             var pwd=fm.userPwd.value; //检测密码
            if(!/^\w{6,16}$/.test(pwd)){
                fm.userPwd.focus();
                fm.userPwd.warningNode.style.display='inline';
                return;
            }
            fm.userPwd.warningNode.style.display='none';

            var repwd =fm.rePwd.value; //确认密码检测
            if(repwd != pwd){
                fm.rePwd.focus();
                fm.rePwd.warningNode.style.display='inline';
                return;
            }
            fm.rePwd.warningNode.style.display='none';

            var qq = fm.qq.value;
            if(!/^\d{5,10}$/.test(qq)){
                fm.qq.focus();
                fm.qq.warningNode.style.display='inline';
                return;
            }
            fm.qq.warningNode.style.display='none';

            var email = fm.email.value;
            if(!/^\w{6,18}@([a-z0-9-]+\.)+[a-z]{1,6}$/.test(email)){
                fm.email.focus();
                fm.email.warningNode.style.display='inline';
                return;
            }
            fm.email.warningNode.style.display='none';

            //验证正确之后提交
            this.submit();
        }
    }
};



// //-------------------面向对象分析----------然后再面向对象编程
// //存在哪些对象
// //先从客户端程序员的角度触发
// /*input HTML Input元素
// validator  验证输入内容是否有效的函数
// * */
// function ValidateInput(input,validator) {
//     //具有验证功能的文本输入域
//     this.input = input;
//     this.validator=validator;
//     //notice  包含提示信息的EM元素
//     //warning 包含错误信息的strong元素
//     this.notice = input.parentNode.getElementByTagName('em')[0];
//     this.warning = input.parentNode.getElementByTagName('strong')[0];
//
//     var _this = this;
//     input.onfocus=invoke(this,'showNotice');
//     input.onblur=invoke(this,'hideNotice');
// }
//
//
// ValidateInput.prototype={
//   showNotice:function () {
//         //显示提示信息
//       this.notice.style.display="inline";
//   },
//     hideNotice:function () {
//       //隐藏提示信息
//         this.notice.style.display="none";
//     },
//    showWarning:function () {
//        //显示错误信息
//        this.warning.style.display="inline";
//    },
//     hideWaring:function () {
//       //隐藏错误信息
//         this.warning.style.display="none";
//     },
//     isValid:function () {
//         //当前输入内容是否有效，有效返回true 无效返回false
//         return this.validator(this.input.value)
//     },
//     validate:function () {
//         //进行验证，无效显示对应的错误信息  有效返回true 否则返回false
//         if(this.isValid()){
//             //当前内容有效，则隐藏错误信息
//             this.hideWaring();
//         }else{
//             this.showWarning();
//         }
//     }
// };
//
// //  调用指定对象的指定方法
// function  invole(obj,method) {
//     return function () {
//         //这里是绑定事件的监听函数
//         obj[method]();
//     };
// }
