import * as alt from "alt";
import chat from 'chat';
import mysql from 'mysql';
import { pool, registerUser, isUserRegistered, loginUser } from '../mysql/mysql'

console.log(">> Loading Core Auth");

export function loginPlayer(player, password){
    if(password.length < 1){
        return;
    } else {
        loginUser(player.name, password, function(result){ //result kintamasis gaunamas iš callback loginUser funkcijoje.
            if(result){ //Gaunamas rezultatas iš callback'o loginUser funkcijoje.
                console.log(`${player.name} has logged in.`); //Įvykdomi veiksmai jeigu callback paduoda TRUE parametrą.
                alt.emit('spawnPlayer', player, 813, -279, 66, 10);
                player.model = 'mp_m_freemode_01';
                alt.emitClient(player, 'loginCamera', true);
                alt.emitClient(player, 'loginPageLoad', false);
                alt.emitClient(player, 'showAlertBox', "Sveikas sugrįžęs", "green", 3000);
            } else if (!result){    //Įvykdomi kiti veiksmai jeigu callback paduoda FALSE parametrą.
                alt.emitClient(player, 'showAlertBox', "Blogas Slaptažodis", "red", 3000);
            }
        });
    }
}

export function registerPlayer(player, password){
    isUserRegistered(player.name, function(result){
        if(result){
            alt.emitClient(player, 'showAlertBox', "Jau esi užsiregistravęs", "red", 3000);
        } else if (!result){
            console.log(`${player.name} has registered.`);
            registerUser(player.name, password);
            player.spawn(813, -279, 66, 10);
            player.model = 'mp_m_freemode_01';
            alt.emitClient(player, 'showAlertBox', "Sveikas atvykęs", "green", 3000);
            alt.emitClient(player, 'loginCamera', true);
            alt.emitClient(player, 'registerPageLoad', false);
        }
    });
}

console.log(">> Loaded Core Auth");