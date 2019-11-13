import * as alt from "alt";
import chat from 'chat';
import mysql from 'mysql';
import { pool, registerUser, isUserRegistered, loginUser, isUserBanned } from '../mysql/mysql'

export function isCharacter(username, callback){
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM characters`, function (error, results, fields) {
            if(results){
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
        connection.query(`SELECT * FROM characters WHERE owner = ?`, player.name,function (error, results, fields) {
            if(error) throw error;
            player.setMeta('firstName', results[0].firstname);
            player.setMeta('lastName', results[0].lastname);
            player.setMeta('birthDate', results[0].birthdate);
            player.setMeta('gender', results[0].gender);
            player.setMeta('charID', results[0].id);
        });
        connection.release();
      });
}

export function createUserCharacter(player, args){
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`INSERT INTO (firstname, lastname, birthdate, gender, owner) VALUES (${args[0]}, ${args[1]}, ${args[2]}, ${args[3]}, ${player.name})`, player.name,function (error, results, fields) {
            if(error) throw error;
        });
        connection.release();
      });
}