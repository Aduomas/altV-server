function loginPlayer(){
    if('alt' in window){
    let password = document.getElementsByName('password')[0].value;
    alt.emit('loginPlayerWeb', `${password}`);
    }
};

function registerPlayer(){
    if('alt' in window){
    let password = document.getElementsByName('password')[0].value;
    alt.emit('registerPlayerWeb', `${password}`);
    }
};

function show()
{
    document.getElementById("limiter").style.display = "block";
}

function hide()
{
    document.getElementById("limiter").style.display = "none";
}

if('alt' in window){
    alt.on('show', show);
    alt.on('hide', hide);
}