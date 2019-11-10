
  if('alt' in window){
    alt.on('showAlert', (text, color, timeout) => {
    console.log('Reached Web');
    var alert = document.getElementById("alertBox");
    alert.style.backgroundColor = color;
    alert.innerHTML = text;
    alert.style.fontFamily = "Ubuntu,sans-serif";
    alert.className = "show";
    console.log(`${text},`);
    setTimeout(function(){
      alert.className = alert.className.replace("show", "");
    }, timeout);
    }
  )};