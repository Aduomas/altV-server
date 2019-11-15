function createChar(){
    let firstname = document.getElementsByName("firstname")[0].value;
    let lastname = document.getElementsByName("lastname")[0].value;
    let birthdate = document.getElementsByName("date")[0].value;
    let gender;
    let radios = document.getElementsByName('genderChoose');

    for (let i = 0, length = radios.length; i < length; i++){
        if (radios[i].checked){
            gender = radios[i].value;
            break;
        }
    }

    let args = {firstname, lastname, birthdate, gender};

    if('alt' in window){
        alt.emit('createNewChar', args);
    }
}

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

window.addEventListener('DOMContentLoaded', () => {
    if('alt' in window){
        alt.emit('WebPageLoaded');
    }
});