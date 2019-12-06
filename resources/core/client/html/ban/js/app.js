function loginPlayer(){
    if('alt' in window){
    let password = document.getElementsByName('password')[0].value;
    alt.emit('loginPlayerWeb', `${password}`);
    }
};

function kickPlayer(){
    if('alt' in window){
        alt.emit('kickPlayerWeb');
    }
};

function show()
{
    document.getElementsByTagName("body")[0].style.display = "block";
}

function hide()
{
    document.getElementsByTagName("body")[0].style.display = "none";
}

if('alt' in window){
    alt.on('show', show);
    alt.on('hide', hide);
}