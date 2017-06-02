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
        _.each(data['r']['d'], function (country_detail, country_code) {
            country_data[country_code] = country_detail['name'];
        });
    } else {
        myPostAction(
            null,
            "http://localhost:8088/api/getCoverCountryList",
            function (data) {
                if (data && data['r'] && data['r']['d']) {
                    localStorage['countrieslist'] = JSON.stringify(data);
                    _.each(data['r']['d'], function (country_detail, country_code) {
                        country_data[country_code] = country_detail['name'];
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
                if (data['r'] && data['r']['d']) {
                    localStorage['operatorslist'] = JSON.stringify(data);
                }
                makeFilterColumn('Operator_id', data, false);  //初始化运营商
            }
        );
    }
    makeFilterColumn('CoverCountryList', {"r": {"d": country_data}}, true); //初始化覆盖国家
    makeFilterchoiceColumn('chosenAll', {"r": {"d": country_data}}, true, 'ALL');
    makeFilterchoiceColumn('chosenJP', {"r": {"d": country_data}}, true, 'JP');
    makeFilterchoiceColumn('chosenTH', {"r": {"d": country_data}}, true, 'TH');
    makeFilterchoiceColumn('chosenAU', {"r": {"d": country_data}}, true, 'AU');
}


function makeFilterColumn(column_name, data, sort) {
    var selector = '.' + column_name;
    var dataStr = '<option value ="-1" selected>请选择</option>';

    if (sort && sort == true) {
        var vk = {};
        _.forEach(data['r']['d'], function (v, k) {
            vk[v] = k;
        });

        _.each(_.sortBy(data['r']['d'], function (v, k) {
            return k;
        }), function (entry_value, entry_key) {
            dataStr += '<option value="' + vk[entry_value] + '">' + vk[entry_value] + '-' + entry_value + '</option>';
        });
    } else {
        _.each(data['r']['d'], function (entry_value, entry_key) {
            dataStr += '<option value="' + entry_key + '">' + entry_value + '</option>';
        });
    }
    $(selector).html(dataStr);
}

function makeFilterchoiceColumn(column_name, data, sort, country) {
    var selector = '.' + column_name;
    var dataStr;

    if (sort && sort == true) {
        var vk = {};
        _.forEach(data['r']['d'], function (v, k) {
            vk[v] = k;
        });

        _.each(_.sortBy(data['r']['d'], function (v, k) {
            return k;
        }), function (entry_value, entry_key) {
            if (vk[entry_value] == country) {
                dataStr += '<option value="' + vk[entry_value] + '" selected="selected">' + vk[entry_value] + '-' + entry_value + '</option>';
            } else {
                dataStr += '<option value="' + vk[entry_value] + '">' + vk[entry_value] + '-' + entry_value + '</option>';
            }

        });
    } else {
        _.each(data['r']['d'], function (entry_value, entry_key) {
            dataStr += '<option value="' + entry_key + '">' + entry_value + '</option>';
        });
    }
    $(selector).html(dataStr);
};

