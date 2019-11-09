function showAlert(value ,color, duration) {
    // Get the snackbar DIV
    var x = document.getElementById("alertBox");
    
    x.style.backgroundColor = color;
    x.innerHTML = value;
    x.style.fontFamily = "Ubuntu,sans-serif";
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){
        x.className = x.className.replace("show", "");
    }, duration);
  }

  alt.on('showAlert', (text, color, timeout) => {
    showAlert(text, color, timeout);
  });