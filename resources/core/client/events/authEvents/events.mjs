import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';
import * as extended from 'altV-extended';

alt.onServer('loginCamera', (args) => {
    let camID = null;
    let cam_pos = {x: 771.085693359375, y: -326.8219909667969, z: 80.879150390625} // <-- player.pos
    let cam_fov = 120;

    camID = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_pos.x, cam_pos.y, cam_pos.z, 90, 90, 90, cam_fov, true,2);
    native.pointCamAtCoord(camID, 392.4527587890625, -558.4747314453125, 69.006591796875); // <-- native.getGameplayCamCoords()
    native.renderScriptCams(true, false, 0, true, false);
    native.displayRadar(false);
    native.triggerScreenblurFadeIn(10);
    alt.emit('hidechat', true);
    native.disableControlAction(0, 199, true);
    if(args){
        native.renderScriptCams(0);
        native.disableControlAction(0, 199, false);
        native.destroyCam(camID, false);
        native.displayRadar(true);
        native.triggerScreenblurFadeOut(100);
        alt.emit('hidechat', false);
    }
});


const registerPage = new alt.WebView("http:/resource/client/html/login/register.html");
const loginPage = new alt.WebView("http:/resource/client/html/login/login.html");
const bannedPage = new alt.WebView("http:/resource/client/html/ban/index.html");


alt.onServer('loginPageLoad', (args) => {
    loginPage.focus();
    if(args){
        alt.showCursor(true);
    } else if (!args){
        alt.showCursor(false);
        loginPage.destroy();
        registerPage.destroy();
        bannedPage.destroy();
    }
});

loginPage.on('loginPlayerWeb', (arg) =>{
    alt.emitServer('loginPlayerFromWeb', arg);
});

alt.onServer('registerPageLoad', (args) => {
    registerPage.focus();
    if(args){
        alt.showCursor(true);
    } else if (!args){
        alt.showCursor(false);
        registerPage.destroy();
        loginPage.destroy();
        bannedPage.destroy();
    }
});

registerPage.on('registerPlayerWeb', (arg) =>{
    alt.emitServer('registerPlayerFromWeb', arg);
});

alt.onServer('bannedPageLoad', (args, name, reason, type, length) => {
    bannedPage.emit('show');
    bannedPage.focus();
    loginPage.destroy();
    registerPage.destroy();
    if(args){
        alt.showCursor(true);
    } else if (!args){
        alt.showCursor(false);
        bannedPage.destroy();
        loginPage.destroy();
        registerPage.destroy();
    }

    bannedPage.emit('loadDetails', name, reason, type, length); 
});

bannedPage.on('kickPlayerWeb',() => {
    alt.emitServer('kickPlayerFromWeb', alt.Player);
});