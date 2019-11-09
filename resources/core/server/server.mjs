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
        alt.emitClient(player, 'loginPageLoad', true);
        alt.emitClient(player, 'hidechat');
    } else if (!result){
        alt.emitClient(player, 'registerPageLoad', true);
        alt.emitClient(player, 'hidechat');
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

alt.on('spawnPlayer', (player, x, y, z, timeout) => {
    player.spawn(x, y, z, timeout);
});

alt.on('destroyVehicle', player => { 
    if (!player.destroyVehicle) return;
    const index = player.vehicles.findIndex(
        veh => parseInt(veh.data.id) === player.destroyVehicle);
});

chat.registerCmd('vehdel', player => {
    alt.emit('destroyVehicle', player);
});


function loginPlayer(player, password){
    if(password.length < 1){
        chat.send(player, 'Neįvedei slaptažodžio');
    } else {
        loginUser(player.name, password, function(result){ //result kintamasis gaunamas iš callback loginUser funkcijoje.
            if(result){ //Gaunamas rezultatas iš callback'o loginUser funkcijoje.
                console.log(`${player.name} has logged in.`); //Įvykdomi veiksmai jeigu callback paduoda TRUE parametrą.
                chat.send(player, 'Sveikas sugrįžęs');
                alt.emit('spawnPlayer', player, 813, -279, 66, 10);
                player.model = 'mp_m_freemode_01';
                alt.emitClient(player, 'loginCamera', true);
                alt.emitClient(player, 'loginPageLoad', false);
                alt.emitClient(player, 'hidechat');
            } else if (!result){    //Įvykdomi kiti veiksmai jeigu callback paduoda FALSE parametrą.
                chat.send(player, 'Blogas slaptažodis')
            }
        });
    }
}
alt.onClient('loginPlayerFromWeb', (player, arg) =>{
    loginPlayer(player, arg);
});

function registerPlayer(player, password){
    isUserRegistered(player.name, function(result){
        if(result){
            chat.send(player, 'Jau esi užsiregistravęs!');
        } else if (!result){
            console.log(`${player.name} has registered.`);
            registerUser(player.name, password);
            player.spawn(813, -279, 69, 10);
            player.model = 'mp_m_freemode_01';
            chat.send(player, 'Sveikas atvykęs');
            alt.emitClient(player, 'loginCamera', true);
            alt.emitClient(player, 'registerPageLoad', false);
            alt.emitClient(player, 'hidechat');
        }
    });
}


alt.onClient('registerPlayerFromWeb', (player, arg) =>{
    registerPlayer(player, arg);
});



