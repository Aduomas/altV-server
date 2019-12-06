import * as alt from "alt";
import { weaponList } from './weapons.mjs';
import chat from 'chat';
import * as auth from '../auth/auth.mjs'
import { pool, registerUser, checkUserStatus, loginUser, bannedHandler, banUser } from '../mysql/mysql'
import { isCharacter, getUserCharacter, createUserCharacter, saveUserCharacter, saveCharacterFace } from '../mysql/charsql'
import * as extended from 'altV-extended'

console.log(">> Loading Core Events");

alt.on('spawnPlayer', (player, x, y, z, timeout) => {
    player.spawn(x, y, z, timeout);
});

alt.on('playerConnect', (player) => {
    checkUserStatus(player, function(result){
        alt.emitClient(player, 'loginCamera');
        player.spawn(740.085693359375, -330.8219909667969, 53.879150390625, 500);  
        console.log(`${player.name} has connected.`);
        if(result === true){
            alt.emitClient(player, 'loginPageLoad', true);
        } else if (result === false){
            alt.emitClient(player, 'registerPageLoad', true);
        } else if (result === 'banned') {
            alt.emitClient(player, 'bannedPageLoad', true);
        }
    });
});

alt.on('giveWeapon', (player, arg) =>
{
    const weaponName = arg[0].toLowerCase();
    
    let ammo = 0;
    if(arg[1] !== undefined){
        ammo = arg[1];
    }

	if (!weaponList[weaponName])
		return player.sendMessage('{FF0000}Tokio ginklo nėra.');

    player.giveWeapon(weaponList[weaponName], ammo, true);
    alt.emitClient(player, 'showAlertBox', `Gavai ${weaponName[0].toUpperCase() + weaponName.slice(1)}`, 'blue', 3000);
});

alt.on('clearWeapons', player =>
{
    player.removeAllWeapons();
    alt.emitClient(player, 'showAlertBox', `Iš tavęs buvo atimti visi ginklai`, 'red', 3000);
});

alt.on('kick', (player, arg) =>
{
    alt.Player.all.forEach(player =>
        {
            if(player.name == arg[0])
            {    
                alt.emitClient(player, 'showAlertBox', `Tu buvai išspirtas už ${arg[1]}`, 'red', 5000);
                setTimeout(function(){
                    player.kick();
                }, 5000);

            }
        });
});

alt.on('ban', (player, arg) => // /ban Name Reason Time
{
    alt.Player.all.forEach(player =>
        {
            if(player.name == arg[0])
            {
                banUser(player, (result) => {
                    if(result)
                    console.log(`${player.name} buvo sėkmingai užblokuotas!`);
                });
                alt.emitClient(player, 'showAlertBox', `Tu buvai ištremptas už ${arg[1]}`, 'red', 5000);
                setTimeout(function(){
                    player.kick();
                }, 5000);
            }
        })
});

alt.onClient('loginPlayerFromWeb', (player, arg) => {
    auth.loginPlayer(player, arg);
});

alt.onClient('getPlayerBanned', (player) => {
    bannedHandler(player);
});

alt.onClient('registerPlayerFromWeb', (player, arg) =>{
    auth.registerPlayer(player, arg);
});

alt.onClient('saveCharacterFaceFromWeb', (player, faceArgs) => {
    saveCharacterFace(player.name, faceArgs);
});

alt.onClient('createCharacterFromWeb', (player, args) => {
    createUserCharacter(player, args);
    console.log(`${player.name} created a character.`);
    alt.emit('spawnPlayer', player, 813, -279, 66, 10);
    alt.emitClient(player, 'loginCamera', true);
    alt.emitClient(player, 'showAlertBox', "Veikėjas sėkmingai sukurtas", "green", 3000);
});

alt.on('playerDisconnect', (player) => {
    console.log(`${player.name} has disconnected`);
    saveUserCharacter(player.name, JSON.stringify(player.pos))
});

alt.on('testingStuff', (player) => {
    player.char = {stamina: 0};
    player.char.stamina = 100;
});

console.log(">> Loaded Core Events");