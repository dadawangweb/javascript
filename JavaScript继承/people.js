/**
 * Created by wang.ding on 2017/4/6.
 */
function People(xing,ming) {
    this.xing = xing;
    this.ming = ming;
}
People.prototype.name = function () {
    alert(this.xing +"-"+this.ming);
}