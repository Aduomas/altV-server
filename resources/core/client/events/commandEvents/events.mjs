import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';

alt.onServer('teleportSky', (pos) => {
    native.switchOutPlayer(alt.Player.local.scriptID, 0, 1);
    alt.setTimeout(() => {
        alt.emitServer('spawnPlayer', pos.x, pos.y, pos.z, 150);
        native.freezeEntityPosition(alt.Player.local.scriptID, true);
        alt.setTimeout(() => {
            native.switchInPlayer(alt.Player.local.scriptID);
        }, 5000)
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
}, 1000);});