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

var loginPage = new alt.WebView("http:/resource/client/html/login/login.html");

alt.onServer('loginPageLoad', (args) => {
    loginPage.focus();
    if(args){
        alt.showCursor(true);
        native.transitionToBlurred(10);
        //native.transitionFromBlurred(10);
    } else if (!args){
        alt.showCursor(false);
        loginPage.destroy();
    }
});

loginPage.on('loginPlayer', (arg) =>{
    console.log(arg);
    alt.emitServer('loginPlayer', arg);
});

