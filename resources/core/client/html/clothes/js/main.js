var slider = document.getElementById("Face");
var output = document.getElementById("FaceLabel");
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = "Veidas " + this.value + "/"+ this.max;
}