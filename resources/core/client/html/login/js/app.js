function loginPlayer(){
    let password = document.getElementsByName('username')[0].value;
    console.log(password);
    alt.emit('loginPlayer', password);
};