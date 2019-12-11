function kickPlayer(){
    if('alt' in window){
        alt.emit('kickPlayerWeb');
    }
}

function loadDetails(username, reason, type, length){
    let usernameText = document.getElementById('username');
    usernameText.textContent = username;
    let reasonText = document.getElementById('reason');
    reasonText.textContent = reason;
    let typeText = document.getElementById('type');
    typeText.textContent = type;
    let lengthText = document.getElementById('length');
    lengthText.textContent = length;
}

function show()
{
    document.getElementsByTagName("body")[0].style.display = "block";
}

window.addEventListener('DOMContentLoaded', () => {
    hide();
});

function hide()
{   
    document.getElementsByTagName("body")[0].style.display = "none";
}

if('alt' in window){
    alt.on('show', show);
    alt.on('hide', hide);
    alt.on('loadDetails', (name, reason, type, length) => {
        loadDetails(name, reason, type, length);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if('alt' in window){
        alt.emit('WebPageLoaded');
    }
});

