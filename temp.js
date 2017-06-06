/**
 * Created by wang.ding on 2017/6/2.
 */
/**
 * Created by wang.ding on 2017/4/20.
 */
function Datatable(tableId) {
    this.tableId = tableId;
};
Datatable.prototype = {
    init: function () {
        this.tableId.DataTable(
            {
                "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]]
            }
        );
    }
};


/**
 * Created by Administrator on 2017/3/2.
 */
//select相关函数
function myPostAction(data, target_url, callback, method) {
    if (target_url == undefined) {
        alert('no url specified');
        return;
    }

    if (method == undefined) {
        method = 'POST';
    }

    $.ajax(
        {
            type: method.toUpperCase(),
            url: target_url,
            data: data,
            processData: false,
            contentType: false,//"multipart/form-data",
            success: function (data) {
                //alert(JSON.stringify(data, " ", 4));
                if (callback != undefined) {
                    if (typeof callback === "function") {
                        callback(data);
                    }
                }

                // myDebugCallback(data);
            },
            error: function () {
            }
        }
    );
};

function initFilterColumnData() {
    var country_data = {};
    // localStorage.removeItem('countrieslist');
    // localStorage.removeItem('operatorslist');
    if (localStorage['countrieslist'] !== 'undefined' && localStorage['countrieslist']['v'] !=='undefined') {
        $.ajax({
            type:'POST',
            url:'http://localhost:8088/api/Country/checkVersion',
            dataType:'JSON',
            data:JSON.parse(localStorage['countrieslist'])['v'],
            success:function (data) {
                if(typeof data['r'] == false){
                    localStorage.removeItem('countrieslist');
                    myPostAction(
                        null,
                        "http://localhost:8088/api/getCoverCountryList",
                        function (data) {
                            if (data && data['d']) {
                                localStorage['countrieslist'] = JSON.stringify(data);
                            }
                        }
                    );
                }
            }
        });
        var data = JSON.parse(localStorage['countrieslist']);
        $.each(data['d'], function (country_code,country_detail) {
            country_data[country_code] = country_detail['name'];
        });
        makeFilterColumn('CoverCountryList', country_data, true); //初始化覆盖国家
        makeFilterchoiceColumn('chosenAll', country_data, true, 'ALL');
        makeFilterchoiceColumn('chosenJP', country_data, true, 'JP');
        makeFilterchoiceColumn('chosenTH', country_data, true, 'TH');
        makeFilterchoiceColumn('chosenAU', country_data, true, 'AU');
    } else {
        myPostAction(
            null,
            "http://localhost:8088/api/getCoverCountryList",
            function (data) {
                if (data && data['d']) {
                    localStorage['countrieslist'] = JSON.stringify(data);
                    $.each(data['d'], function (country_code,country_detail) {
                        if(country_detail['in_cover'] == true){
                            country_data[country_code] = country_detail['name'];
                        }else{
                            return true;
                        }
                    });
                    makeFilterColumn('CoverCountryList', country_data, true); //初始化覆盖国家
                    makeFilterchoiceColumn('chosenAll', country_data, true, 'ALL');
                    makeFilterchoiceColumn('chosenJP', country_data, true, 'JP');
                    makeFilterchoiceColumn('chosenTH', country_data, true, 'TH');
                    makeFilterchoiceColumn('chosenAU', country_data, true, 'AU');
                }
            }
        );
    }

    if (localStorage['operatorslist'] !== 'undefined'&& localStorage['operatorslist']['v'] !=='undefined') {
        $.ajax({
            type:'POST',
            url:'http://localhost:8088/api/CardOperator/checkVersion',
            data:JSON.parse(localStorage['operatorslist'])['v'],
            dataType:'JSON',
            success:function (data) {
                if(typeof data['r'] == false){
                    localStorage.removeItem('operatorslist');
                    myPostAction(
                        null,
                        "http://localhost:8088/api/getOperatorList",
                        function (data) {
                            if (data && data['d']) {
                                localStorage['operatorslist'] = JSON.stringify(data);
                            }
                            makeFilterColumn('Operator_id', data, false);  //初始化运营商
                        }
                    );
                }
            }
        });
        makeFilterColumn('Operator_id', JSON.parse(localStorage['operatorslist']), false);
    } else {
        myPostAction(
            null,
            "http://localhost:8088/api/getOperatorList",
            function (data) {
                if (data && data['d']) {
                    localStorage['operatorslist'] = JSON.stringify(data);
                }
                makeFilterColumn('Operator_id', data, false);  //初始化运营商
            }
        );
    }
};


function makeFilterColumn(column_name, data, sort) {
    var str = "";
    if(sort == true){
        $.each(data,function (index,value) {
            str = str +"<option value ="+index+">"+index+"-"+value+"</option>";
        });
    }else{
        for(var i in data['d']){
            str = str +"<option>"+data['d'][i]['name']+"</option>";
        }
    }
    $("."+column_name).append(str);
};

function makeFilterchoiceColumn(column_name, data, sort, country) {
    var str = "";
    if(sort == true){
        $.each(data,function (index,value) {
            if(index == country){
                str = str +"<option value ="+index+" selected='selected'>"+index+"-"+value+"</option>";
            }else{
                str = str +"<option value ="+index+">"+index+"-"+value+"</option>";
            }
        });
    }else{
        for(var i in data['d']){
            str = str +"<option>"+data['d'][i]['name']+"</option>";
        }
    }
    $("."+column_name).append(str);
};


