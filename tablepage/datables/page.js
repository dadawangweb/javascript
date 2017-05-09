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
    };
    var tables = new Datable(initdata.selector,initdata.url,initdata.columns);
    tables.initTable();
} );
    
function Datable(selector,url,columns) {
    this.selector = selector;
    this.url = url;
    this.columns = columns;
    this.initTable = function () {
        this.selector.DataTable( {
            "ajax": {
                "url": this.url,
                "type": "POST",
                // "data":data,
            },
            "columns": this.columns
        } );
    }
}