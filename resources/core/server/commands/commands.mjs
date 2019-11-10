import * as alt from "alt";
import chat from 'chat';

console.log(">> Loading Core Commands");

chat.registerCmd('car', (player, args) =>{
    let veh = new alt.Vehicle(args[0], player.pos.x + 2, player.pos.y + 2, player.pos.z, 0, 0, 0);
});

chat.registerCmd('pos', (player) => {
    chat.send(player, `X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`);
    console.log(`X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`)
});

chat.registerCmd('vehdel', player => {
    player.vehicle.destroy();
});

chat.registerCmd('gun', (player, gun) => {
    alt.emitServer('gun', gun);
});

console.log(">> Loaded Core Commands");