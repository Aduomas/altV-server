import * as alt from "alt";
import { pool, registerUser, checkUserStatus, loginUser, bannedHandler, banUser } from '../mysql/mysql'

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