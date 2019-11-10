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
    } else if (!result){
        alt.emitClient(player, 'registerPageLoad', true);
    }
    });
});

chat.registerCmd('car', (player, args) =>{
    let veh = new alt.Vehicle(args[0], player.pos.x + 2, player.pos.y + 2, player.pos.z, 0, 0, 0);
    player.personalVehicle = [veh];
});

chat.registerCmd('pos', (player) => {
    chat.send(player, `X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`);
    console.log(`X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`)
});

alt.on('spawnPlayer', (player, x, y, z, timeout) => {
    player.spawn(x, y, z, timeout);
});


function loginPlayer(player, password){
    if(password.length < 1){
        alt.emitClient(player, 'showAlertBox', "Neįvestas slaptažodis", "red", 3000);
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
alt.onClient('loginPlayerFromWeb', (player, arg) =>{
    loginPlayer(player, arg);
});

function registerPlayer(player, password){
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


alt.onClient('registerPlayerFromWeb', (player, arg) =>{
    registerPlayer(player, arg);
});

chat.registerCmd('alert', (player, args) => {
    alt.emitClient('showAlertBox', args[0], args[1], args[2]);
});

chat.registerCmd('vehdel', player => {
    if (player.personalVehicle !== undefined) {
		try {
            for(var i = 0; i < player.personalVehicle.length; i++)
                player.personalVehicle[i].destroy();
            
		} catch (err) {
			player.personalVehicle = undefined;
		}
	}
});

chat.registerCmd('noclip', player => {
    alt.emitClient(player, 'noclip', player);
});




