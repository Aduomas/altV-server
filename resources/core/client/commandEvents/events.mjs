import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';


alt.onServer('testingClientStuff', (player) => {
    alt.log(player.char.stamina);
});