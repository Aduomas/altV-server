import * as alt from "alt";
import chat from 'chat';
import * as extended from 'altV-extended'

console.log(">> Loading Core Commands");

chat.registerCmd('car', (player, args) =>{
    try{
        let veh = new alt.Vehicle(args[0], player.pos.x + 2, player.pos.y + 2, player.pos.z, 0, 0, 0);
    } catch(err) {
        chat.send(player, 'Netinkamas mašinos modelis.');
    }
});

chat.registerCmd('pos', (player) => {
    chat.send(player, `X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`);
    console.log(`X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`)
});

chat.registerCmd('vehdel', player => {
    try{
        player.vehicle.destroy();
    } catch(err) {
        chat.send(player, 'Nesėdi mašinoje.');
    }
});

chat.registerCmd('weapon', (player, arg) => {
    alt.emit('giveWeapon', player, arg);
});

chat.registerCmd('clearweapon', player =>
{
    alt.emit('clearWeapons', player);
});

chat.registerCmd('face', (player) => {
    alt.emitClient(player, 'createNewFaceCreationPage', true);
});

chat.registerCmd('kick', (player, arg) =>
{
    alt.emit('kick', player, arg);
});

chat.registerCmd('ban', (player, arg) =>
{
    alt.emit('ban', player, arg);
});

chat.registerCmd('testNative', (player, args) => {
    alt.emitClient(player, 'testNative', args);
});

console.log(">> Loaded Core Commands");