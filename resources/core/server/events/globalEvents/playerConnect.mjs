import * as alt from "alt";
import { pool, registerUser, checkUserStatus, loginUser, bannedHandler, banUser, checkBanInfo, getUserPermissions } from '../../systems/mysql/mysql'
import * as date from '../../systems/utility/date.mjs';

alt.on('playerConnect', (player) => {
    checkUserStatus(player, function(result){
        alt.emitClient(player, 'loginCamera');
        player.spawn(740.085693359375, -330.8219909667969, 53.879150390625, 500);  
        console.log(`${player.name} has connected.`);

        getUserPermissions(player, (perm) =>
        {
            player.perm = perm;
        });

        if(result === true){
            alt.emitClient(player, 'loginPageLoad', true);

        } else if (result === false){
            alt.emitClient(player, 'registerPageLoad', true);
        } else if (result === 'banned') {
            checkBanInfo(player, (reason, type, length, ip, hwid) => {
                if(length < Date().now)
                    unbanUser(player);
                if(player.ip == ip && player.hwidHash == hwid)
                    alt.emitClient(player, 'bannedPageLoad', true, player.name, reason, type, date.leftTime(length));
                else alt.emitClient(player, 'showAlertBox', `Prisijungei su kitu kompiuteriu arba IP adresu!`, 'red', 5000);
            });
        }
    });
});