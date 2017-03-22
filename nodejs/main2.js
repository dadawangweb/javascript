/**
 * Created by wang.ding on 2016/12/8.
 */
//---------异步
// var fs = require("fs");
//
// fs.readFile('input.txt',function (err,data) {
//     if(err) return console.err(err);
//     console.log(data.toString());
// });
//
// console.log("程序执行结束！");

//-------事件
    //引入events模块
var events = require('events');
//创建eventEmitter对象
var eventEmitter  = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function connected() {
    console.log('连接成功。');

    //触发data_received事件
    eventEmitter.emit('data_received');
}

//绑定connection事件处理程序
eventEmitter.on('connection',connectHandler);

//使用匿名函数绑定data_received事件
eventEmitter.on('data_received',function () {
    console.log('数据连接成功。');
});

//触发connection事件
eventEmitter.emit('connection');

console.log("程序执行完毕。");