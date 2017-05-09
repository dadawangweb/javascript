/**
 * Created by wang.ding on 2017/5/8.
 */
jQuery(function () {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:63342/githubsync/javaScript/tablepage/page.json",
            dataType: "JSON",
            success: function (txt) {
                initTableOne('example', txt);
                $('#example').DataTable({
                    "lengthMenu": [[5, 10, 100, -1], [5, 10, 100, "All"]]
                });
            }
        });
    });


    var user = [
        { "dataa": "tb_num" },
        { "dataa": "tb_imsi" },
        { "dataa": "tb_bam" },
        { "dataa": "tb_slot" },
        { "dataa": "tb_state" }
    ];

    function initTableOne(table, data) {
        var html = "";
        var userlength = user.length;
        var trlength = data["tbody"]["tb_num"].length;
        for (var i = 0; i < trlength; i++) {
            html = html + "<tr><td>"+i+"</td>";
            for(var j = 0; j < userlength;j++){
                html = html+"<td>"+data['tbody'][user[j]['dataa']][i]+"</td>";
            }
            html = html + "</tr>";
        }
        $("#" +table+ "").append(html);
    };
})
