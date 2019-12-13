import * as alt from "alt";
import { weaponList } from '../utility/weapons.mjs';
import chat from 'chat';
import * as auth from '../auth/auth.mjs'
import { pool, registerUser, checkUserStatus, loginUser, banUser } from '../mysql/mysql'
import { isCharacter, getUserCharacter, createUserCharacter, saveUserCharacter, saveCharacterFace } from '../mysql/charsql'
import * as extended from 'altV-extended'

alt.onClient('loginPlayerFromWeb', (player, arg) => {
    auth.loginPlayer(player, arg);
});

alt.onClient('getPlayerBanned', (player) => {
    bannedHandler(player);
});

alt.onClient('registerPlayerFromWeb', (player, arg) =>{
    auth.registerPlayer(player, arg);
});