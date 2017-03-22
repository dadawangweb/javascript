/**
 * Created by wang.ding on 2017/3/9.
 */
function Hello(){
    var name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayHello = function () {
        console.log('Hello '+ name);
    };
};
module.exports = Hello;