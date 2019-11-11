
  if('alt' in window){
    alt.on('showAlert', (text, color, timeout) => {
    var alert = document.getElementById("alertBox");
    alert.style.backgroundColor = color;
    alert.innerHTML = text;
    alert.style.fontFamily = "Ubuntu,sans-serif";
    alert.className = "show";
    setTimeout(function(){
      alert.className = alert.className.replace("show", "");
    }, timeout);
    }
  )};