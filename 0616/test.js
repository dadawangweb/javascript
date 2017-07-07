/**
 * Created by wang.ding on 2017/7/5.
 */
function countryEvent(eventCountry) {
    var stringEvent = "";
    $.get({
        url:baseUrl + "/api/v1.0/get_country_event/?country=" + eventCountry,
        dataType:'json',
        success:function (data) {
            if(data[2016].length > 0){
                stringEvent = stringEvent + "<li class='time-label'>"+
                    "<span class='bg-red'>"+
                    "2016"+
                    "</span>"+
                    "</li>";
                for(var i = 0;i < data[2016].length;i++){
                    stringEvent = stringEvent +"<li>"+
                                                    "<i class='fa fa-comments bg-yellow'></i>"+
                                                    "<div class='timeline-item'>"+
                                                        "<div class='col-md-12' style='padding-left: 0px'>"+
                                                            "<div class='box box-default'>"+
                                                                "<div class='box-header with-border'>"+
                                                                    "<span class='time'><i class='fa fa-clock-o'></i>"+data[i].event_date+"</span>"+
                                                                    "<h6 class='box-title'>" + data[i].event_name+"</h6>"+
                                                                    "<div class='box-tools pull-right'>"+
                                                                        "<button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>"+
                                                                        "</button>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                                "<div class='box-body'>"+
                                                                    + data[i].event_info +
                                                                "</div>"+
                                                            "</div>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "</li>";
                }
            }
            if(data[2017].length > 0){
                stringEvent = stringEvent + "<li class='time-label'>"+
                                                "<span class='bg-green'>"+
                                                    "2017"+
                                                "</span>"+
                                            "</li>";
                for(var i = 0;i < data[2017].length;i++){
                    stringEvent = stringEvent +"<li>"+
                                                    "<i class='fa fa-comments bg-yellow'></i>"+
                                                    "<div class='timeline-item'>"+
                                                        "<div class='col-md-12' style='padding-left: 0px'>"+
                                                            "<div class='box box-default'>"+
                                                                "<div class='box-header with-border'>"+
                                                                    "<span class='time'><i class='fa fa-clock-o'></i>"+data[i].event_date+"</span>"+
                                                                    "<h6 class='box-title'>" + data[i].event_name+"</h6>"+
                                                                    "<div class='box-tools pull-right'>"+
                                                                        "<button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>"+
                                                                        "</button>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                                "<div class='box-body'>"+
                                                                    + data[i].event_info +
                                                                "</div>"+
                                                            "</div>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "</li>";
                }
                stringEvent = stringEvent + "<li>"+
                                                "<i class='fa fa-clock-o bg-gray'></i>"+
                                            "</li>";
                $(".timeline-inverse").append(stringEvent);
            }else{
                stringEvent = stringEvent + "<li>"+
                                                "<i class='fa fa-clock-o bg-gray'></i>"+
                                            "</li>";
                $(".timeline-inverse").append(stringEvent);
            }
        }
    });
}
