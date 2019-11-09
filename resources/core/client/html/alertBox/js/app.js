function showAlertBox(value ,color, duration) {
    var alert = document.getElementById("alertBox");
    alert.style.backgroundColor = color;
    alert.innerHTML = value;
    alert.style.fontFamily = "Ubuntu,sans-serif";
    alert.className = "show";
    setTimeout(function(){
      alert.className = alert.className.replace("show", "");
    }, duration);
  }
  if('alt' in window){
    alt.on('showAlert', (text, color, timeout) => {
      console.log(text);
      showAlertBox(text, color, timeout);
    }
  )};