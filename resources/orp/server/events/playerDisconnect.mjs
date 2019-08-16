import * as alt from 'alt';

console.log('Loaded: events->playerDisconnect.mjs');

alt.on('playerDisconnect', (player, reason) => {
    // If the player isn't logged in; don't do anything else.
    if (player.guid === undefined) {
        alt.log(`${player.name} has disconnected.`);
        return;
    }

    // Check if the player has character data.
    if (player.data === undefined) {
        alt.log(`${player.name} has disconnected.`);
        return;
    }

    // Save players last location dependent on what they're doing.
    if (player.lastLocation !== undefined) {
        player.data.lastposition = JSON.stringify(player.lastLocation);
    } else {
        player.data.lastposition = JSON.stringify(player.pos);
    }

    player.data.health = player.health;

    // Save the data.
    player.save();
    alt.log(`${player.name} has disconnected and logged out.`);
});
