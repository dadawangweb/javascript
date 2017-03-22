/**
 * Created by wang.ding on 2016/12/8.
 */
var events = require('events');
var eventEmitter = new events.EventEmitter();

///监听器 #1
var listener1 = function listener1() {
    console.log('监听器listener1执行');
}

//监听器 #2
var listener2 = function listener() {

}