/**
 * Created by wang.ding on 2017/5/2.
 */
jQuery(function($) {
    var baseUrl = 'http://localhost:8088';  // +document.domain;
    initFilterColumnData();         //初始化chosen select   localstorage
    sessionStorage.removeItem("chartsData");
    var chartsDatas = {};
    function  initChartsData(){
        if (sessionStorage['chartsData'] && sessionStorage['chartsData'] != undefined) {
            chartsDatas =  JSON.parse(sessionStorage['chartsData']);
            defaultInit('container1',selectFourCountryData('ALL'));
        } else{
            myPostAction(
                null,
                baseUrl+"/CardPlan/getPeakData",
                function (data) {
                    sessionStorage['chartsData'] = JSON.stringify(JSON.parse(data));
                    chartsDatas =  JSON.parse(sessionStorage['chartsData']);
                    defaultInit('container1',selectFourCountryData('ALL'));
                }
            )
        }

    };

    initChartsData();
    Highcharts.setOptions({
        timezoneOffset: +8
    });

    function Countryhighcharts(classname,data) {
        var flag = 0;   //判断国家有无
        $.each(chartsDatas,function(i, n){
            if(data == i){
                flag = 1;
            }
        });
        if(flag = 0){
            alert("无对应国家，请重新选择国家！");
            return ;
        }
        var data2016 = [];
        var data2017 = [];
        var data_pre = [];
        var data_date = chartsDatas.date.substr(5);

        if(data["data_pre"] == undefined){
            data_pre.push([Date.parse('2017/01/01'), 0]);
        }else {
            $.each(data["data_pre"],function(date, peak) {
                data_pre.push([Date.parse(date.replace(new RegExp("\\-","gi"),"/")) + 86400000 , parseInt(peak)]);
            });
        }
        if( data["data2017"] == undefined){
            data2017.push([Date.parse('2017/01/01'), 0]);
        }else{
            $.each(data["data2017"],function(date, peak) {
                data2017.push([Date.parse(date.replace(new RegExp("\\-","gi"),"/")) + 86400000 , parseInt(peak)]);
            });
        }
        if( data["data2016"] == undefined){
            data2016.push([Date.parse('2017/01/01'), 0]);
        }else{
            $.each(data["data2016"],function(date, peak) {
                var  fdate = Date.parse(date.replace(new RegExp("\\-","gi"),"/"));
                if (fdate < Date.parse('2016/02/29')) {
                    data2016.push([Date.parse(date.replace(new RegExp("\\-","gi"),"/")) + 31536000000 + 86400000 + 86400000  , parseInt(peak)]);
                } else if ( fdate == '2016/02/29') {
                    return true;
                } else {
                    data2016.push([Date.parse(date.replace(new RegExp("\\-","gi"),"/")) + 31536000000 + 86400000  , parseInt(peak)]);
                }
            });
        }
//            求2016中的最大值
//                function maxValue() {
//                    var temp = [];
//                    $.each(data["data2016"],function(date, peak) {
//                        temp.push(parseInt(peak));
//                    });
//                    max2016 = Math.max.apply(Math,temp);
//                };
//                maxValue();
        $("#" + classname + "").highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: ' 16-17年在线峰值同期对比'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                data_date +'更新预测数据' : '手势操作进行缩放'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                }
            },
            tooltip: {
//                    xDateFormat: '%Y-%m-%d',
                share:true
            },
            yAxis:  [{ // Primary yAxis
                min:0,
                labels: {
                    format: '{value} ',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: '在线预测峰值',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }],
            tooltip: {
                shared: true
            },
            legend: {
//                        enabled: false
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
            },
            series: [ {
                type: 'spline',
                yAxis: 0,
                name: '2017年预测',
                data:  data_pre,
                tooltip:{
                    dateTimeLabelFormats: {
                        day: '%Y-%m-%d',
                        week: '%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                    }
                }
            },
                {
                    name: '2016年在线峰值',
                    type: 'spline',
                    yAxis:0,
                    data: data2016,
                    color:'#c5604e',
                    tooltip:{
                        dateTimeLabelFormats: {
                            day: '%Y-%m-%d',
                            week: '%m-%d',
                            month: '%Y-%m',
                            year: '%Y'
                        }
                    }
                },
                {
                    name: '2017年在线峰值',
                    type: 'spline',
                    yAxis:0,
                    data: data2017,
                    color:'#c5004e',
                    tooltip:{
                        dateTimeLabelFormats: {
                            day: '%Y-%m-%d',
                            week: '%m-%d',
                            month: '%Y-%m',
                            year: '%Y'
                        }
                    }
                }]
        });
    };

    function selectFourCountryData(countryName) {
        for(var key in chartsDatas){
            if(key == countryName) {
                return chartsDatas[key];
            }
        }
    };

    function defaultInit(containerclassname,defaultCountry) {
        Countryhighcharts(containerclassname,defaultCountry);
    };
    
    
    $(".chosenAll").on('change', function() {
        var tempValue = $(".chosenAll option:selected").val();
        Countryhighcharts("container1",selectFourCountryData(tempValue));
    });
});
