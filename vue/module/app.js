/**
 * Created by wang.ding on 2017/5/15.
 */
import component from 'component.html'

var app = new Vue({
    el:'#app',
    components: {
        'my-component': component
    },
    data:{
        message:'Hello Vue!'
    }
})