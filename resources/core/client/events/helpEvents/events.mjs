import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';
import * as extended from 'altV-extended'

alt.on('freezePlayer', (state) => {
    native.freezeEntityPosition(alt.Player.local.scriptID, state);
    alt.setInterval(() => {
        native.disableControlAction(0, 69, state) // INPUT_VEH_ATTACK
        native.disableControlAction(0, 92, state) // INPUT_VEH_PASSENGER_ATTACK
        native.disableControlAction(0, 114, state) // INPUT_VEH_FLY_ATTACK
        native.disableControlAction(0, 140, state) // INPUT_MELEE_ATTACK_LIGHT
        native.disableControlAction(0, 141, state) // INPUT_MELEE_ATTACK_HEAVY
        native.disableControlAction(0, 142, state) // INPUT_MELEE_ATTACK_ALTERNATE
        native.disableControlAction(0, 257, state) // INPUT_ATTACK2
        native.disableControlAction(0, 263, state) // INPUT_MELEE_ATTACK1
        native.disableControlAction(0, 264, state) // INPUT_MELEE_ATTACK2
        native.disableControlAction(0, 24, state) // INPUT_ATTACK
        native.disableControlAction(0, 25, state) // INPUT_AIM
        native.disableControlAction(0, 18, state) // SPACE
    }, 0);
});