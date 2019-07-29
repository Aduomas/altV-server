import mysql from 'mysql';
import index from 'D:/ALT-V Server/altV-server/node_modules/mysql';

const config = {
    connectionLimit: 50,
    host: '',
    user: '',
    password: '',
    database: ''
}
let pool = index.createPool(config);


export function getPool(): mysql.Pool {
    if (pool) return pool;
    pool = mysql.createPool(config);
    pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
      });
      pool.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
      });
    return pool;
}