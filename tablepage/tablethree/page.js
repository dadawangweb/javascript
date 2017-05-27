/**
 * Created by wang.ding on 2017/5/8.
 */
jQuery(function () {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:63342/githubsync/javaScript/tablepage/tabletwo/page.json",
            dataType: "JSON",
            data:"country=dingwang&org=dingwang",
            success: function (txt) {
                var tableInit = new Datable(table.selector,table.coloum,txt);
                tableInit.initTable();
                $('#example').DataTable({
                    "lengthMenu": [[5, 10, 100, -1], [5, 10, 100, "All"]]
                });
            }
        });
    });

    var table = {
        "selector":$("#example"),
        "coloum":[
            { "data": "tb_num" },
            { "data": "tb_imsi" },
            { "data": "tb_bam" },
            { "data": "tb_slot" },
            { "data": "tb_state" }
        ],
    };
   
    function Datable(selector,coloum,data) {
        this.selector = selector;
        this.coloum = coloum;
        this.data = data;
        this.initTable = function () {
            var html = "";
            var userlength = this.coloum.length;
            var trlength = this.data["data"].length;
            for (var i = 0; i < trlength; i++) {
                html = html + "<tr><td>"+i+"</td>";
                for(var j = 0; j < userlength;j++){
                    html = html+"<td>"+this.data["data"][i][coloum[j]['data']]+"</td>";
                }
                html = html + "</tr>";
            }
            this.selector.append(html);
        }
    }
});
