import * as alt from "alt";
import { weaponList } from '../systems/utility/weapons.mjs';
import chat from 'chat';
import * as auth from '../systems/auth/auth.mjs'
import { pool, registerUser, checkUserStatus, loginUser, bannedHandler, banUser } from '../systems/mysql/mysql'
import { isCharacter, getUserCharacter, createUserCharacter, saveUserCharacter, saveCharacterFace } from '../systems/mysql/charsql'
import * as extended from 'altV-extended'

console.log(">> Loading Core Events");

import * as playerConnectEvent from './globalEvents/playerConnect.mjs'
import * as playerDisconnectEvent from './globalEvents/playerDisconnect.mjs'
import * as helpEvents from './globalEvents/helpEvents.mjs'
import * as authEvents from '../systems/auth/authEvents.mjs'
import * as charEvents from '../systems/character/charEvents.mjs'

console.log(">> Loaded Core Events");