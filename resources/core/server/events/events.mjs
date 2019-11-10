import * as alt from "alt";
import chat from 'chat';
import * as auth from '../auth/auth.mjs'
import { pool, registerUser, isUserRegistered, loginUser } from '../mysql/mysql'

console.log(">> Loading Core Events");

alt.on('spawnPlayer', (player, x, y, z, timeout) => {
    player.spawn(x, y, z, timeout);
});

alt.onClient('loginPlayerFromWeb', (player, arg) =>{
    auth.loginPlayer(player, arg);
});

alt.onClient('registerPlayerFromWeb', (player, arg) =>{
    auth.registerPlayer(player, arg);
});

alt.on('playerConnect', (player) => {
    isUserRegistered(player.name, function(result){
        alt.emitClient(player, 'loginCamera');
        player.spawn(740.085693359375, -310.8219909667969, 59.879150390625, 500);
        if(result){
           console.log(`${player.name} has connected.`);
          alt.emitClient(player, 'loginPageLoad', true);
        } else if (!result){
           alt.emitClient(player, 'registerPageLoad', true);
        }
    });
});

alt.on

console.log(">> Loaded Core Events");