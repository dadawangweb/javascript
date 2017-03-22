/**
 * Created by wang.ding on 2017/3/15.
 */
var mysql  = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '4877061',
    port: '3306',
    database: 'test',
});

connection.connect();

var  sql = 'SELECT * FROM msg';
//查
connection.query(sql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();