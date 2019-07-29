import mysql from 'mysql';
import {getPool} from 'D:/ALT-V Server/altV-server/resources/freeroam/server/modules/mysql';

class DbSingleton {
    private pool: mysql.Pool;
    private static _instance: DbSingleton;

    private constructor() {
        this.pool = getPool();
        console.log('connection created to mysql');
    }
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    query(sql:any, args?:any): Promise<any>{
        return new Promise((resolve, reject) => {
            if (args){
                this.pool.query(sql,args, (err, rows) => {
                    if (err){
                        return reject(err);
    
                    } else {
                        resolve(rows)
                    }
                });
            } else {
                this.pool.query(sql, (err, rows) => {
                    if (err){
                        return reject(err);
    
                    } else {
                        resolve(rows)
                    }
                });
            }
        });

    }
    getConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                        console.error('db connection lost/closed.')
                    }
                    if (err.code === 'ER_CON_COUNT_ERROR') {
                        console.error('db too many connections.')
                    }
                    if (err.code === 'ECONNREFUSED') {
                        console.error('db connection was refused.')
                    }
                    return reject(err);
                }
                if (connection) {
                    connection.release()
                    resolve(connection)
                }
            })

        });
    }
}

const Db = DbSingleton.Instance;
export default Db;﻿