import mysql from 'mysql';

var logindetails = {
    connectionLimit : 30,
    host: "remotemysql.com",
    user:"DFyex81QX5",
    password: "aJamUq7sBD",
    database: "DFyex81QX5",
    stringifyObjects: true
};

export var pool = mysql.createPool(logindetails);