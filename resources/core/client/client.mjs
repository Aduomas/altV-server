import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';

alt.onServer('loginCamera', (args) => {
    let camID = null;
    let cam_pos = {x: 771.085693359375, y: -326.8219909667969, z: 80.879150390625} // <-- player.pos
    let cam_fov = 120;

    camID = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_pos.x, cam_pos.y, cam_pos.z, 90, 90, 90, cam_fov, true,2);
    native.pointCamAtCoord(camID, 392.4527587890625, -558.4747314453125, 69.006591796875); // <-- native.getGameplayCamCoords()
    native.renderScriptCams(true, false, 0, true, false);
    native.displayRadar(false);
    if(args){
        native.renderScriptCams(0);
        native.destroyCam(camID, false);
        native.displayRadar(true);
    }
});

const registerPage = new alt.WebView("http:/resource/client/html/login/register.html");
const loginPage = new alt.WebView("http:/resource/client/html/login/login.html");

alt.onServer('loginPageLoad', (args) => {
    loginPage.focus();
    if(args){
        alt.showCursor(true);
        native.transitionToBlurred(10);
        alt.emit('hidechat');
    } else if (!args){
        alt.showCursor(false);
        loginPage.destroy();
        registerPage.destroy();
        alt.emit('hidechat');
        native.transitionFromBlurred(100);
    }
});

loginPage.on('loginPlayerWeb', (arg) =>{
    alt.emitServer('loginPlayerFromWeb', arg);
});

alt.onServer('registerPageLoad', (args) => {
    registerPage.focus();
    if(args){
        alt.showCursor(true);
        native.transitionToBlurred(10);
        alt.emit('hidechat');
    } else if (!args){
        alt.showCursor(false);
        registerPage.destroy();
        loginPage.destroy();
        native.transitionFromBlurred(100);
        alt.emit('hidechat');
    }
});

registerPage.on('registerPlayerWeb', (arg) =>{
    alt.emitServer('registerPlayerFromWeb', arg);
});

alt.onServer('showAlertBox', (text, color, timeout) =>{
    let alert = new alt.WebView("http://resource/client/html/alertBox/alert.html");
    alt.log(text);
    alt.setTimeout(() => {
        alert.emit('showAlert', text, color, timeout);
    }, 250);

    alt.setTimeout(() => {
        alert.destroy(); 
    }, timeout);
    alt.log("alert emitted");
});

alt.onServer('noclip', (player) =>{
    // NATIVE nerastas
});
