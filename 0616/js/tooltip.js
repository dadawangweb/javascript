/**
 * Created by wang.ding on 2017/6/22.
 */
$(function () {
    Highcharts.chart('container1', {
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (event) {
                            alert('类别： ' + this.category + '，值：' + this.y + '，下标：' + this.x + ' 位置：x' + event.clientX +'y:'+ event.clientY);
                            var clientX = event.pageX+'px';
                            var clientY = event.pageY-100+'px';
                            $("#container1").append(""+
                                "<div class='col-md-3 confirm'>"+
                                "<div class='box box-success'>"+
                                "<div class='box-header with-border'>"+
                                "<h3  class='box-title'>Removable</h3>"+
                                "<div class='box-tools pull-right'>"+
                                "<button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>"+
                                "</div>"+
                                "</div>"+
                                "<div class='box-body'>" +
                                "<p>"+this.category+"</p>" +
                                "<p>"+this.x+"</p>" +
                                "<p>"+this.y+"</p>" +
                                "</div>"+
                                "</div>"+
                                "</div>");
                            $('.confirm').css({"position":"absolute","left":clientX,"top":clientY});
                        }
                    }
                }
            }
        },
        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });

});