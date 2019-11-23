import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';

var charPage = new alt.WebView("http:/resource/client/html/characters/character.html");

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

charPage.on('createNewChar', (args) => {
    alt.emit('createNewCharacterPage', false);
    alt.emitServer('createCharacterFromWeb', args);
});


charPage.on('WebPageLoaded', () => {
    alt.setTimeout(() => {
        charPage.emit('hide');
    }, 500);
});