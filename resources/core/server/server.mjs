import * as alt from "alt";
import chat from 'chat';
import mysql from 'mysql';
import { pool, registerUser, isUserRegistered, loginUser } from '../mysql/mysql'

alt.on('playerConnect', (player) => {
    isUserRegistered(player.name, function(result){
    alt.emitClient(player, 'loginCamera');
    player.spawn(740.085693359375, -310.8219909667969, 59.879150390625, 500);
    if(result){
        console.log(`${player.name} has connected.`);
        chat.send(player, 'Prisijunk naudodamas /login [slaptažodis]');
    } else if (!result){
        chat.send(player, 'Užsiregistruok naudodamas /register [slaptažodis]');
    }
    });
});

chat.registerCmd('car', (player, args) =>{
    let veh = new alt.Vehicle(args[0], player.pos.x + 2, player.pos.y + 2, player.pos.z, 0, 0, 0);
});

chat.registerCmd('pos', (player) => {
    chat.send(player, `X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`);
    console.log(`X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`)
});

chat.registerCmd('register',(player, password) => {
    isUserRegistered(player.name, function(result){
        if(result){
            chat.send(player, 'Jau esi užsiregistravęs!');
        } else if (!result){
            console.log(`${player.name} has registered.`);
            registerUser(player.name, password[0]);
            player.model = 'mp_m_freemode_01';
            player.spawn(813, -279, 69, 1000);
            alt.emitClient(player, 'loginCamera', true);
        }
    });
});

chat.registerCmd('login',(player, password) => {
    if(password.length > 1){
        chat.send(player, '/login [slaptažodis]');
    } else {
        loginUser(player.name, password, function(result){ //result kintamasis gaunamas iš callback loginUser funkcijoje.
            if(result){ //Gaunamas rezultatas iš callback'o loginUser funkcijoje.
                console.log(`${player.name} has logged in.`); //Įvykdomi veiksmai jeigu callback paduoda TRUE parametrą.
                chat.send(player, 'Sveikas sugrįžęs');
                player.model = 'mp_m_freemode_01';
                player.spawn(813, -279, 66, 1000);
                alt.emitClient(player, 'loginCamera', true);
            } else if (!result){    //Įvykdomi kiti veiksmai jeigu callback paduoda FALSE parametrą.
                chat.send(player, 'Blogas slaptažodis')
            }
        });
    }
});