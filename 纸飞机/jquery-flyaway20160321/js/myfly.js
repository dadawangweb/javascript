/**
 * Created by wang.ding on 2017/6/23.
 */
function animate(x) {
    $('#demo').removeClass('float shadow').addClass('flyaway ' + x).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('#demo').addClass('shadow float').removeClass('flyaway ' + x);
    });
};

$(document).ready(function() {
    animate("popUp");
});
