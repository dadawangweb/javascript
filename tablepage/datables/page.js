/**
 * Created by wang.ding on 2017/5/9.
 */
$(document).ready(function() {
    var initdata = {
        "selector":$('#example'),
        "url":"http://localhost:63342/githubsync/javaScript/tablepage/datables/data.json",
        "columns":[
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "extn" },
            { "data": "start_date" },
            { "data": "salary" }
        ],
        "val":{
            "country": "dingwang",
            "org": "dingwang"
        }
    };
    var tables = new Datable(initdata.selector,initdata.url,initdata.columns,initdata.val);
    tables.initTable();
} );
    
function Datable(selector,url,columns,val) {
    this.selector = selector;
    this.url = url;
    this.columns = columns;
    this.val = val;
    this.initTable = function () {
        var _this = this;
        this.selector.DataTable( {
            "ajax": {
                "url": this.url,
                "type": "POST",
                "data":function(d){
                    d.country=_this.val.country;
                    d.org=_this.val.org;
                },
            },
            "columns": this.columns
        } );
    }
}