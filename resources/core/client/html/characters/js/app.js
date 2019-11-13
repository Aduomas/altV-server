var gender;

function createChar(){
    let firstname = document.getElementsByName("firstname")[0].value;
    let lastname = document.getElementsByName("lastname")[0].value;
    let birthdate = document.getElementsByName("date")[0].value;

    console.log(`${firstname}, ${lastname}, ${birthdate}, ${gender}`);

    alt.emit('createNewChar', firstname, lastname, birthdate, gender);
}

function changeGender(cgender){
    gender = cgender;
}