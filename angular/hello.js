/**
 * Created by wang.ding on 2017/3/21.
 */
var myModule = angular.module("MyModule",[]);
myModule.directive("hello",function () {
    return{
        restrict:"AE",
        // transclude:true,
        replace:true,
        template:"<div>Hello everyone!</div>"
    }
})