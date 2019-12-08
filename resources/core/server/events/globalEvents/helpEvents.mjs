import * as alt from "alt";
import { weaponList } from '../utility/weapons.mjs';
import chat from 'chat';
import * as auth from '../auth/auth.mjs'
import { pool, registerUser, checkUserStatus, loginUser, bannedHandler, banUser } from '../mysql/mysql'
import { isCharacter, getUserCharacter, createUserCharacter, saveUserCharacter, saveCharacterFace } from '../mysql/charsql'
import * as extended from 'altV-extended'

alt.on('spawnPlayer', (player, x, y, z, timeout) => {
    player.spawn(x, y, z, timeout);
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
                player.banReason = arg[1];
                banUser(player, (result) => {
                    if(result)
                    console.log(`${player.name} buvo sėkmingai užblokuotas!`);
                });
                alt.emitClient(player, 'showAlertBox', `Tu buvai ištremptas už ${player.banReason}`, 'red', 5000);
                setTimeout(function(){
                    player.kick();
                }, 5000);
            }
        })
});

alt.onClient('kickPlayerFromWeb', (player, arg) =>
{
    alt.emitClient(player, 'showAlertBox', `${arg[0]}`, 'red', 3000);
    setTimeout(function(){
        player.kick();
    }, 3000);
});