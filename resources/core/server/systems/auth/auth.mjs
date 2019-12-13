import * as alt from "alt";
import chat from 'chat';
import mysql from 'mysql';
import { pool, registerUser, checkUserStatus, loginUser } from '../mysql/mysql'
import { isCharacter, getUserCharacter, createUserCharacter } from '../mysql/charsql'

console.log(">> Loading Core Auth");

export function loginPlayer(player, password){
    if(password.length < 1){
        return;
    } else {
            loginUser(player, password, function(result){ //result kintamasis gaunamas iš callback loginUser funkcijoje.
                if(result){ //Gaunamas rezultatas iš callback'o loginUser funkcijoje.
                    console.log(`${player.name} has logged in.`); //Įvykdomi veiksmai jeigu callback paduoda TRUE parametrą.
                    alt.emitClient(player, 'loginPageLoad', false);
                    isCharacter(player, function(results){
                    if(results){
                        getUserCharacter(player);
                        alt.emitClient(player, 'showAlertBox', "Sveikas sugrįžęs", "green", 3000);
                    } else {
                        alt.emitClient(player, 'createNewCharacterPage', true);
                    }
                });
            } else if (!result){    //Įvykdomi kiti veiksmai jeigu callback paduoda FALSE parametrą.
                alt.emitClient(player, 'showAlertBox', "Blogas Slaptažodis", "red", 3000);
            }
        });
    } 
}

export function registerPlayer(player, password){
    checkUserStatus(player, function(result){
        if(result){
            alt.emitClient(player, 'showAlertBox', "Jau esi užsiregistravęs", "red", 3000);
        } else if (!result){
            console.log(`${player.name} has registered.`);
            registerUser(player.name, password);
            alt.emitClient(player, 'createNewCharacterPage', true);
            getUserCharacter(player);
            alt.emitClient(player, 'showAlertBox', "Sveikas atvykęs", "green", 3000);
            alt.emitClient(player, 'registerPageLoad', false);
        }
    });
}

console.log(">> Loaded Core Auth");