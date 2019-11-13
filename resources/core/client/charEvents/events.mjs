import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';

alt.onServer('createNewCharacterPage', (args) => {
    const charPage = new alt.WebView("http:/resource/client/html/characters/character.html");
    if(args){
        charPage.focus();
        alt.showCursor(true);
    } else if (!args){
        charPage.destroy();
    }
});

alt.on('createNewChar', (args) => {
    args.forEach(element => {
        console.log(args[element]);
    });
    createUserCharacter(alt.Player, args);
});
