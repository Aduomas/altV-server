import * as alt from 'alt';
import * as native from 'natives';

alt.onServer('loginCamera', (args) => {
    let camID = null;
    let cam_pos = {x: 771.085693359375, y: -326.8219909667969, z: 59.879150390625} // <-- player.pos
    let cam_fov = 50;

    camID = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", cam_pos.x, cam_pos.y, cam_pos.z, 90, 90, 90, cam_fov, true,2);
    native.pointCamAtCoord(camID, 392.4527587890625, -558.4747314453125, 69.006591796875); // <-- native.getGameplayCamCoords()
    native.renderScriptCams(true, false, 0, true, false);
    if(args){
        native.renderScriptCams(0);
        native.destroyCam(camID, false);
    }
});
