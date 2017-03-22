/**
 * Created by wang.ding on 2017/3/10.
 */
var server = require("./server");
var router = require("./router");

server.start(router.route);