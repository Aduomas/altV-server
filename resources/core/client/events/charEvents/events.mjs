import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';
import * as extended from 'altV-extended'

var charPage = new alt.WebView("http:/resource/client/html/characters/character.html");
var facePage = new alt.WebView("http:/resource/client/html/clothes/clothingMenu.html");

alt.onServer('createNewCharacterPage', (args) => {
    charPage.emit('show');
    if(args){
        alt.setInterval(() => {
            native.disableControlAction(alt.Player.local.scriptID, 199, true);
        }, 0);
        charPage.focus();
        alt.showCursor(true);
    } else if (!args){
        charPage.destroy();
        alt.showCursor(false);
    }
});

alt.onServer('createNewFaceCreationPage', (args) => {
    facePage.emit('show');
    if(args){
        facePage.focus();
        alt.showCursor(true);
    } else if (!args){
        facePage.emit('hide');
        alt.showCursor(false);
    }
});

alt.on('createNewFaceCreationPage', (args) => {
    facePage.emit('show');
    if(args){
        facePage.focus();
        alt.showCursor(true);
    } else if (!args){
        facePage.emit('hide');
        alt.showCursor(false);
    }
});

charPage.on('createNewChar', (args) => {
    alt.emit('createNewCharacterPage', false);
    alt.emitServer('createCharacterFromWeb', args);
});


charPage.on('WebPageLoaded', () => {
    alt.setTimeout(() => {
        charPage.emit('hide');
    }, 500);
});

alt.on('changeFace', (args) => {
    native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
    native.setPedHeadBlendData( alt.Player.local.scriptID, args.motherFace, args.dadFace, 0, args.motherSkin, args.fatherSkin, 0, args.faceMix / 100, args.skinMix / 100, 0, false);
});

alt.onServer('changeFaceWeb', (status, args) => {
    alt.emit('changeFaceWeb', status, args);
});

alt.on('changeFaceWeb', (status, args, faceArgs, facialArgs, componentArgs, hColorArgs) => {
    switch(status){
        case 1:
            alt.emit('changeFace', (args));
            break;
        case 2:
            alt.emit('changePedFacialHair', (args));
            break;
        case 3:
            alt.emit('changePedHairColor', (args));
            break;
        case 4:
            alt.emit('changePedComponent', (args));
            break;
        case 5:
            let allArgs = {
                faceArgs: faceArgs,
                facialArgs: facialArgs,
                componentArgs: componentArgs,
                hColorArgs: hColorArgs
            };
            alt.emitServer('saveCharacterFaceFromWeb', (allArgs));
        default:
            return;
    }
});

facePage.on('changeFaceWeb', (status, args, faceArgs, facialArgs, componentArgs, hColorArgs) => {
    switch(status){
        case 1:
            alt.emit('changeFace', (args));
            break;
        case 2:
            alt.emit('changePedFacialHair', (args));
            break;
        case 3:
            alt.emit('changePedHairColor', (args));
            break;
        case 4:
            alt.emit('changePedComponent', (args));
            break;
        case 5:
            let allArgs = {
                faceArgs: faceArgs,
                facialArgs: facialArgs,
                componentArgs: componentArgs,
                hColorArgs: hColorArgs
            };
            alt.emitServer('saveCharacterFaceFromWeb', (allArgs));
        default:
            return;
    }
});

facePage.on('retrieveDataFromAlt', (args) => {
    let returnValue = native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 2, args) - 1;
    facePage.emit('loadDataFromAlt', returnValue);
});

alt.on('changePedFacialHair', (args) => {
    if(!args.changeColor)
        native.setPedHeadOverlay(alt.Player.local.scriptID, args.id[1], args.cid[1], args.opacity[1]);
        native.setPedHeadOverlay(alt.Player.local.scriptID, args.id[0], args.cid[0], args.opacity[0]);
    if(args.changeColor)
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, args.id[0] ,args.colorid, args.color, args.secColor);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, args.id[1] ,args.colorid, args.color, args.secColor);
});

alt.on('changePedComponent', (args) => {
    native.setPedComponentVariation(alt.Player.local.scriptID, args.cid, args.did, args.tid, 2);
});

alt.on('changePedHairColor', (args) => {
    native.setPedHairColor(alt.Player.local.scriptID, args.cid, args.hid);
});

alt.onServer('charCamera', (args) => {
    charCamera(args);
});

facePage.on('charCamera', (args) => {
    charCamera(args);
});

function charCamera(args){
    let camID = null;
    let cam_pos = {x: 403.002197265625, y: -999.7055053710938, z: -98.5146484375} // <-- player.pos
    let cam_fov = 20;
    alt.emitServer('spawnPlayer', 402.949462890625, -996.2901000976562, -99.7146484375, 150);
    alt.setTimeout(() => {
        native.setEntityRotation(alt.Player.local.scriptID, 0, 0, 180, 1, true);
    }, 500);
    alt.emit('freezePlayer', true);
    camID = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_pos.x, cam_pos.y, cam_pos.z, 90, 90, 90, cam_fov, true,2);
    native.pointCamAtCoord(camID, 402.949462890625, -996.2901000976562, -98.5146484375); // <-- native.getGameplayCamCoords()
    native.renderScriptCams(true, false, 0, true, false);
    native.displayRadar(false);
    alt.emit('createNewFaceCreationPage', true);
    alt.emit('hidechat', true);
    native.disableControlAction(0, 199, true);
    if(args){
        native.renderScriptCams(0);
        alt.emit('freezePlayer', false);
        native.disableControlAction(0, 199, false);
        native.destroyCam(camID, false);
        native.displayRadar(true);
        alt.emit('createNewFaceCreationPage', false);
        alt.emit('hidechat', false);
        alt.emitServer('spawnPlayer', 813, -279, 66, 10);
    }
}