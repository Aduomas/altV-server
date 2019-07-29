import mysql from 'mysql';

const config = {
    connectionLimit: 50,
    host: '91.211.245.190',
    user: 'solar',
    password: 'Solar9632',
    database: 'altv'
}
let pool: mysql.Pool;


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