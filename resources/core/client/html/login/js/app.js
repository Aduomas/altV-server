function loginPlayer(){
    if('alt' in window){
    let password = document.getElementsByName('password')[0].value;
    console.log(password);
    alt.emit('loginPlayerWeb', `${password}`);
    }
};

function registerPlayer(){
    if('alt' in window){
    let password = document.getElementsByName('password')[0].value;
    console.log(password);
    alt.emit('registerPlayerWeb', `${password}`);
    }
};

function show()
{
    document.getElementById("body").style.display = "block";
}

function hide()
{
    document.getElementById("body").style.display = "none";
}

if('alt' in window){
    alt.on('show', show);
    alt.on('hide', hide);
}