// General Setup for the Page
$(() => {
    $('#passwordtwo').hide();
    $('#alert').hide();
    $('#alertSuccess').hide();
});

var selection = 0;
// 0 - Existing
// 1 - Register

// Called when any button is clicked.
$('button').on('click', e => {
    $('#alert').hide();
    $('#alertSuccess').hide();
    changeButtonFocus(e.target.id);

    if (e.target.id === 'existing') {
        goToLogin();
        return;
    }

    if (e.target.id === 'register') {
        goToRegister();
        return;
    }

    if (e.target.id === 'submit') {
        console.log('submitting');
        $('#submit').prop('disabled', true);

        var username = $('#username').val();
        var password = $('#password').val();
        var password2 = $('#passwordtwo').val();

        if (username.length <= 5) {
            showAlertMessage(
                'Vartotojas turi būti bent 5 simbolių ilgumo.'
            );
            return;
        }

        if (password.length <= 8) {
            showAlertMessage(
                'Slaptažodis turi būti bent 5 simbolių ilgumo.'
            );
            return;
        }

        if (selection === 0) {
            // Existing Account
            // Send emit
            alt.emit('existingAccount', username, password);
        } else {
            // Register Account
            if (password !== password2) {
                showAlertMessage('Slaptažodžiai nesutampa.');
                return;
            }

            alt.emit('registerAccount', username, password);
        }
        return;
    }
});

// Change the button focus from one to another.
function changeButtonFocus(id) {
    $(`#${id}`).addClass('btn-primary');
    $(`#${id}`).removeClass('btn-secondary');
}

// Show an Alert Message
function showAlertMessage(message) {
    $('#submit').prop('disabled', false);
    $('#alert').html(`Error: ${message}`);
    $('#alert').show();
}

// Show a Success Message
function showAlertSuccessMessage(message) {
    $('#submit').prop('disabled', false);
    $('#alertSuccess').html(`Pavyko! ${message}`);
    $('#alertSuccess').show();
}

// Navigate to the Login Menu
function goToLogin() {
    selection = 0;
    changeButtonFocus('existing');
    $('#pagetitle').addClass('animated flipOutX');
    $('#register').removeClass('btn-primary');
    $('#register').addClass('btn-secondary');
    setTimeout(() => {
        $('#passwordtwo').slideUp(200);
        $('#pagetitle').removeClass('animated flipOutX');
        $('#pagetitle').addClass('animated flipInX');
        $('#pagetitle').html('Prisijungimas');
    }, 300);
}

// Navigate to the Register Menu
function goToRegister() {
    selection = 1;
    changeButtonFocus('register');
    $('#pagetitle').addClass('animated flipOutX');
    $('#existing').removeClass('btn-primary');
    $('#existing').addClass('btn-secondary');

    setTimeout(() => {
        $('#passwordtwo').slideDown(200);
        $('#pagetitle').removeClass('animated flipOutX');
        $('#pagetitle').addClass('animated flipInX');
        $('#pagetitle').html('Registracija');
    }, 300);
}

// Alt Events
if ('alt' in window) {
    alt.on('error', errorName => {
        showAlertMessage(errorName);
    });

    alt.on('success', successMessage => {
        showAlertSuccessMessage(successMessage);
    });

    alt.on('goToLogin', goToLogin);
}
