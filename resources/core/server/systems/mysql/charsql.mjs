import * as alt from "alt";
import chat from 'chat';
import mysql from 'mysql';
import { pool, registerUser, checkUserStatus, loginUser } from '../mysql/mysql'

export function isCharacter(player, callback){
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM characters WHERE owner = ?`, player.name, function (error, results, fields) {
            if(error) throw error;
            if(results.length){
                return callback(true);
            } else {
                return callback(false);
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
            if(results.length){
                player.firstName = results[0].firstname;
                player.lastName = results[0].lastname;
                player.birthDate = results[0].birthdate;
                player.gender =  results[0].gender;
                player.charID = results[0].id;
                player.bank = results[0].bank;
                alt.emit('spawnPlayer', player, 813, -279, 66, 10);
                if(results[0].gender == "Vyras"){
                    player.model = 'mp_m_freemode_01';
                } else {
                    player.model = 'mp_f_freemode_01';
                }
                alt.emit('spawnPlayer', player, JSON.parse(results[0].pos).x, JSON.parse(results[0].pos).y, JSON.parse(results[0].pos).z);
                //alt.emitClient(player, 'changeFace', (JSON.parse(results[0].face)));
                alt.emitClient(player, 'loginCamera', true);
            }
        });
        connection.release();
      });
}

export function createUserCharacter(player, args){
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`INSERT INTO characters (firstname, lastname, birthdate, gender, owner) VALUES ("${args.firstname}", "${args.lastname}", "${args.birthdate}", "${args.gender}", "${player.name}")`, function (error, results, fields) {
            if(error) throw error;
        });
        connection.release();
      });
}

export function saveUserCharacter(playerName, pos){
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`UPDATE characters SET pos = '${pos}' WHERE owner = ?`, playerName, function (error, results, fields) {
            if(error) throw error;
        });
        connection.release();
    });
};

export function saveCharacterFace(playerName, faceArgs){
        pool.query(`UPDATE characters SET face = '${JSON.stringify(faceArgs)}' WHERE owner = ?`, playerName, function (error, results, fields) {
            if(error) throw error;
        });
};