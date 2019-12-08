import * as alt from "alt";
import { isCharacter, getUserCharacter, createUserCharacter, saveUserCharacter, saveCharacterFace } from '../mysql/charsql'
import * as extended from 'altV-extended'

alt.on('playerDisconnect', (player) => {
    console.log(`${player.name} has disconnected`);
    saveUserCharacter(player.name, JSON.stringify(player.pos))
});