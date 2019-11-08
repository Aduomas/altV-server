// mysql.js failas kuriame yra visos core funkcijos susijusios su MySQL ar duomenų baze
import mysql from 'mysql';
import { type } from 'os';

var logindetails = {
    connectionLimit : 30,
    host: "remotemysql.com",
    user:"DFyex81QX5",
    password: "aJamUq7sBD",
    database: "DFyex81QX5",
    stringifyObjects: true
};

export function registerUser(username, password){ //Naudojama užregistruoti vartotoją. username = player.name. Password = input.
    pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`INSERT INTO accounts (USER, PASSWORD) VALUES ('${username}', '${password}')`, function (error, results, fields) {
      if (error) throw error;
    });
    connection.release();
  });
}

export function loginUser(username, password, callback){ //Naudojama prisijungimui. Username = player.name. Password = input, Callback = Funkcija
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query(`SELECT USER, PASSWORD FROM accounts`, function (error, results, fields) {
      if (error) throw error;
      for(let i = 0; i < results.length; i++){
        if(results[i].USER == username && results[i].PASSWORD == password){
          return callback(true); //Returnina TRUE callback funkcijai kuri naudojama kitame skripte apdorojant rezultatą
      }
      return callback(false);
    });
    connection.release();
  });
}

export function isUserRegistered(username, callback){ //Naudojama ar žaidėjas registruotas tikrinimui. Username = player.name., Callback = Funkcija
    pool.getConnection(function(err, connection) {
      if(err) throw error;
        connection.query(`SELECT USER FROM accounts`, function (error, results, fields) {
          if(error) throw error;
          if(JSON.stringify(results).includes(username)){
            return callback(true); //Returnina TRUE callback funkcijai kuri naudojama kitame skripte apdorojant rezultatą
          } else {
            if(error) throw error;
            return callback(false); //Returnina FALSE callback funkcijai kuri naudojama kitame skripte apdorojant rezultatą
          }
        });
        connection.release();
      });
}


export var pool = mysql.createPool(logindetails);

