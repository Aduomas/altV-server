// mysql.js failas kuriame yra visos core funkcijos susijusios su MySQL ar duomenų baze
import mysql from 'mysql';
import { type } from 'os';
import * as encrypt from'../utility/encryption.mjs';


var logindetails = {
    connectionLimit : 100,
    host: "remotemysql.com",
    user:"DFyex81QX5",
    password: "aJamUq7sBD",
    database: "DFyex81QX5",
    stringifyObjects: true
};

export function registerUser(username, password){ //Naudojama užregistruoti vartotoją. username = player.name. Password = input.
    pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`INSERT INTO accounts (USER, PASSWORD, PERMISSIONLEVEL) VALUES ('${username}', '${encrypt.encryptPassword(password)}', 'USER')`, function (error, results, fields) {
      if (error) throw error;
    });
    connection.release();
  });
}

export function loginUser(player, password, callback){ //Naudojama prisijungimui. Username = player.name. Password = input, Callback = Funkcija
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`SELECT USER, PASSWORD FROM accounts`, function (error, results, fields) {
      if (error) throw error;
      for(let i = 0; i < results.length; i++){
        if(results[i].USER == player.name && encrypt.verifyPassword(password, results[i].PASSWORD))
        connection.query(`UPDATE accounts SET LASTIP = '${player.ip}' WHERE USER = '${player.name}'`, function (error, results, fields) {
          if (error) throw error;
        });
          return callback(true); //Returnina TRUE callback funkcijai kuri naudojama kitame skripte apdorojant rezultatą
      }
      callback(false);
    });
    connection.release();
  });
}

export function checkUserStatus(player, callback){ //Naudojama ar žaidėjas registruotas tikrinimui. Username = player.name., Callback = Funkcija
    pool.getConnection(function(err, connection) {
      if(err) throw error;
        connection.query(`SELECT USER, BANNED FROM accounts WHERE USER = ?`, player.name, function (error, results, fields) {
          if(error) throw error;
          if(results.length){
            if(results[0].BANNED == 'TRUE')
              return callback('banned');
            return callback(true); //Returnina TRUE callback funkcijai kuri naudojama kitame skripte apdorojant rezultatą
          } else {
            if(error) throw error;
            return callback(false); //Returnina FALSE callback funkcijai kuri naudojama kitame skripte apdorojant rezultatą
          }
        });
        connection.release();
      });
}

export function bannedHandler(player, callback){
  pool.getConnection(function(err, connection) {
    if(err) throw error;
    connection.query(`SELECT USER FROM bans WHERE USER = ?`, player.name ,function (error, results, fields) {
      if(error) throw error;
        if(results.length){
          if(results[0].type === 'IP'){
            return callback('IP', results[0].reason, results[0].length);
          } else if (results[0].type === 'HWID'){
            return callback('HWID', results[0].reason, results[0].length);
          } else if (results[0].type === 'ACCOUNT'){
            return callback('ACCOUNT', results[0].reason, results[0].length);
          }
        }
    });
    connection.release();
  });
}


export var pool = mysql.createPool(logindetails);

