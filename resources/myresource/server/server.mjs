import * as alt from 'alt';
import * as chat from 'chat';
import * as extended from 'server-extended';

// SpawnPoint
const playerSpawn = {
    x: -365.425,
    y: -131.809,
    z: 37.873
}


alt.on('playerConnect', LoadPlayer);
alt.on('playerDeath', (target, killer, weapon) => {
    // LOG DEATHS
    alt.log(`${target.name} was killed by ${killer.name} with ${weapon.name}.`);
    // RESPAWN
    target.spawn(playerSpawn.x, playerSpawn.y, playerSpawn.z, 5);
});

function LoadPlayer(player)
{
    // LOAD MONEY, JOB, STATS...

    // SPAWN PLAYER
    SpawnPlayer(player);
}

function SpawnPlayer(player) {
    player.model = 'u_m_m_aldinapoli';
    player.spawn(playerSpawn.x, playerSpawn.y, playerSpawn.z, 0);
}


// COMMANDS
/*chat.registerCmd('giveweapon', (player, args) => {
    if(args.length <= 0) {
        chat.send(player, '{FF0000}/giveweapon [weapon_name] [ammoAmmount] [id]'); // NEED IDS IN ARGUMENTS (NOT DONE)
        return;
    }

    const weaponName = args[0].toLowerCase();
    if(weaponList[weaponName] == undefined) {
        chat.send(player, '{FF0000} Weapon is not valid');
        return;
    }

    var ammoAmount = 0;
    if(args[1] != undefined)
        ammoAmount = parseInt(args[1], 10);
    else ammoAmount = 9999;

    var id = 0;
    if(args[2] != undefined)
        id = parseInt(args[2], 10);
    else id = alt.Player.all;;

    player.giveWeapon(weaponList[weaponName], ammoAmount, true);
    chat.send(player, `You were given ${weaponName} with ${ammoAmount} amount of ammo.`);
});*/