import * as alt from "alt";
import { weaponList } from '../utility/weapons.mjs';
import chat from 'chat';
import * as auth from '../auth/auth.mjs'
import { pool, registerUser, checkUserStatus, loginUser, bannedHandler, banUser } from '../mysql/mysql'
import { isCharacter, getUserCharacter, createUserCharacter, saveUserCharacter, saveCharacterFace } from '../mysql/charsql'
import * as extended from 'altV-extended'

alt.onClient('saveCharacterFaceFromWeb', (player, faceArgs) => {
    saveCharacterFace(player.name, faceArgs);
    alt.emitClient(player, 'createNewFaceCreationPage', false);
});

alt.onClient('createCharacterFromWeb', (player, args) => {
    createUserCharacter(player, args);
    alt.emitClient(player, 'createNewFaceCreationPage', false);
    console.log(`${player.name} created a character.`);
    alt.emit('spawnPlayer', player, 813, -279, 66, 10);
    alt.emitClient(player, 'loginCamera', true);
    alt.emitClient(player, 'showAlertBox', "Veikėjas sėkmingai sukurtas", "green", 3000);
});