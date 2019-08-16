import * as alt from 'alt';
import * as crypto from '../utility/encryption.mjs';
import SQL from '../../../postgres-wrapper/database.mjs';
import { DefaultSpawn } from '../configuration/coordinates.mjs';
import * as facecustomizer from '../customizers/facialcustomizer.mjs';

console.log('Loaded: registration->login.mjs');

const db = new SQL(); // Get DB Reference

// Called when a user wants to login from events folder.
export function userLogin(player, username, password) {
    if (player.guid !== undefined) return;

    // Console Logging for Login Attempts
    alt.log(`${player.name} is attempting a login with ${username}.`);

    // Insure that username and password field are filled out.
    if (username === undefined || password === undefined) {
        player.showRegisterEventError('Slaptažodis arba vartotojo vardas neįrašytas.');
        return;
    }

    db.fetchData('username', username, 'Account', user => {
        // Check if Username is taken
        if (user === undefined) {
            player.showRegisterEventError('Paskyra nerasta');
            return;
        }

        if (!crypto.verifyPassword(password, user.password)) {
            player.showRegisterEventError(
                'Blogi duomenys'
            );
            return;
        }

        player.showRegisterEventSuccess('Sėkmingas prisijungimas! Palaukite...');

        finishPlayerLogin(player, user.id);
        alt.log(`${player.name} has logged in.`);
    });
}

// Called when the player is finishing their login.
export function finishPlayerLogin(player, databaseID) {
    // Fade the screen out in 1 second, then fade back after 2 seconds in 1 second.
    player.screenFadeOutFadeIn(200, 2000);

    player.guid = databaseID;

    db.fetchByIds(player.guid, 'Character', results => {
        // Close the registration dialogue.
        player.closeRegisterDialogue();

        // Existing Character
        if (Array.isArray(results) && results.length >= 1) {
            existingCharacter(player, results[0]);
            return;
        }

        // New Character
        newCharacter(player);
    });
}

// Called when a new character needs to be added to the database.
function newCharacter(player) {
    // Character does not exist.
    const data = {
        id: player.guid,
        lastposition: JSON.stringify(DefaultSpawn),
        model: 'mp_m_freemode_01',
        health: 200
    };

    // Save the new Character data to the database and assign to the player.
    db.upsertData(data, 'Character', data => {
        existingCharacter(player, data);
    });
}

// Called for any existing characters.
function existingCharacter(player, data) {
    // Setup data on the player.
    player.data = data;

    // Logout or Spawn Position
    const lastLogoutPos = JSON.parse(player.data.lastposition);

    // Spawn the player.
    player.spawn(lastLogoutPos.x, lastLogoutPos.y, lastLogoutPos.z, 1);

    // Set Player Health
    player.health = player.data.health;

    // Set the player's name if its not null.
    if (data.name !== null) {
        player.needsRoleplayName = false;
    } else {
        player.needsRoleplayName = true;
    }

    // Set Character Model and Data
    if (player.data.face === null) {
        // Show them the new character / new name menu.
        // TODO: Force show the menu.
        player.model = 'mp_f_freemode_01'; // Set the player model.
        facecustomizer.requestFacialCustomizer(player, lastLogoutPos); // Request facial changes menu.
    } else {
        // Load Existing Model
        const characterFaceData = JSON.parse(player.data.face);
        if (characterFaceData['Sex'].value === 0) {
            player.model = 'mp_f_freemode_01';
        } else {
            player.model = 'mp_m_freemode_01';
        }

        // Apply the face to the player.
        alt.emitClient(player, 'applyFacialData', data.face);

        if (player.needsRoleplayName) {
            alt.log('User needs a roleplay name.');
            alt.emitClient(player, 'chooseRoleplayName');
        }
    }

    if (player.data.name !== null) {
        alt.log(`${player.data.name} has spawned.`);
        player.setSyncedMeta('name', player.data.name);
    } else {
        alt.log(`${player.name} has spawned.`);
    }
}
