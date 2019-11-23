import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';

var charPage = new alt.WebView("http:/resource/client/html/characters/character.html");
var facePage = new alt.WebView("http:/resource/client/html/clothes/clothingMenu.html");

alt.onServer('createNewCharacterPage', (args) => {
    charPage.emit('show');
    if(args){
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
        facePage.destroy();
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

alt.onServer('changeFace' , (args) => {
    native.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
    native.setPedHeadBlendData( alt.Player.local.scriptID, args[0], args[1], 0, args[2], args[3], 0, args[4] / 100, args[5] / 100, 0, false);
});

facePage.on('changeFaceWeb', (args) => {
    alt.log(args);
    alt.emit('createNewFaceCreationPage', false);
    alt.emit('changeFace', args);
});