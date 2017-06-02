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
}

function initFilterColumnData() {
    var country_data = {};
    if (localStorage['countrieslist'] && localStorage['countrieslist'] != 'undefined') {
        var data = JSON.parse(localStorage['countrieslist']);
        // _.each(data['r']['d'], function (country_detail, country_code) {
        //     country_data[country_code] = country_detail['name'];
        // });
        $.each(data['d'], function (country_code,country_detail) {
            country_data[country_code] = country_detail['name'];
            alert(country_data);
        });
    } else {
        myPostAction(
            null,
            "http://localhost:8088/api/getCoverCountryList",
            function (data) {
                if (data && data['d']) {
                    localStorage['countrieslist'] = JSON.stringify(data);
                    // _.each(data['d'], function (country_detail, country_code) {
                    //     country_data[country_code] = country_detail['name'];
                    // });
                    $.each(data['d'], function (country_code,country_detail) {
                        country_data[country_code] = country_detail['name'];
                        alert(country_data);
                    });
                }
            }
        );
    }

    if (localStorage['operatorslist'] && localStorage['operatorslist'] != 'undefined') {
        makeFilterColumn('Operator_id', JSON.parse(localStorage['operatorslist']), false);
    } else {
        myPostAction(
            null,
            "http://localhost:8088/api/getOperatorList",
            function (data) {
                if (data && data['d']) {
                    localStorage['operatorslist'] = JSON.stringify(data);
                }
                makeFilterColumn('Operator_id', data['d'], false);  //初始化运营商
            }
        );
    }
    makeFilterColumn('CoverCountryList', country_data, true); //初始化覆盖国家
    // makeFilterchoiceColumn('chosenAll', country_data, true, 'ALL');
    // makeFilterchoiceColumn('chosenJP', country_data, true, 'JP');
    // makeFilterchoiceColumn('chosenTH', country_data, true, 'TH');
    // makeFilterchoiceColumn('chosenAU', country_data, true, 'AU');
}


function makeFilterColumn(column_name, data, sort) {
    var str = '<option value ="-1" selected>请选择</option>';
    if(sort == true){
        $.each(data,function (index,value) {
            str = str +"<option value ="+index+">"+index+"-"+value+"</option>";
        });
        
    }else{
        $.each(data,function (index,value) {
            str = str +"<option value ="+index+">"+value+"</option>";
        });
    }
    $(column_name).append(str);
}

// function makeFilterchoiceColumn(column_name, data, sort, country) {
//
// };

