import * as alt from "alt";
import chat from 'chat';
import mysql from 'mysql';
import { pool, registerUser, isUserRegistered, loginUser, isUserBanned } from '../mysql/mysql'

export function isCharacter(username, callback){
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM characters`, function (error, results, fields) {
            if(!results){
                return callback(false);
            } else {
                return callback(true);
            }
        });
        connection.release();
      });
}

export function getUserCharacter(player){
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM characters WHERE owner = ${player.name}`, function (error, results, fields) {
            if(error) throw error;
            player.setMeta('firstName', results.firstname);
            player.setMeta('lastName', results.lastname);
        });
        connection.release();
      });
}