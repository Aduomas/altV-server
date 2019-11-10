import * as alt from 'alt';
import * as native from 'natives';
import chat from 'chat';

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