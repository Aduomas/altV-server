/*var slider = document.getElementById("Face");
var output = document.getElementById("FaceLabel");
 Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = "Veidas " + this.value + "/"+ this.max;
}*/

let motherFaceSlider = document.getElementById("motherFace");
let dadFaceSlider = document.getElementById("dadFace");
let motherSkinSlider = document.getElementById("motherSkin");
let dadSkinSlider = document.getElementById("dadSkin");
let faceMixSlider = document.getElementById("faceMix");
let skinMixSlider = document.getElementById("skinMix");
let motherFaceLabel = document.getElementById("motherFaceLabel");
let dadFaceLabel = document.getElementById("dadFaceLabel");
let motherSkinLabel = document.getElementById("motherSkinLabel");
let dadSkinLabel = document.getElementById("dadSkinLabel");
let faceMixLabel = document.getElementById("faceMixLabel");
let skinMixLabel = document.getElementById("skinMixLabel");

motherFaceSlider.oninput = function() {
  motherFaceLabel.innerHTML = "Motina " + this.value + "/"+ this.max;
  alt.emit('changeFaceWeb', (motherFaceSlider.value, dadFaceSlider.value, motherSkinSlider.value, dadSkinSlider.value, faceMixSlider.value, skinMixSlider.value));
}

dadFaceSlider.oninput = function() {
  dadFaceLabel.innerHTML = "Tėvas " + this.value + "/"+ this.max;
  alt.emit('changeFaceWeb', (motherFaceSlider.value, dadFaceSlider.value, motherSkinSlider.value, dadSkinSlider.value, faceMixSlider.value, skinMixSlider.value));
}

motherSkinSlider.oninput = function() {
  motherSkinLabel.innerHTML = "Motinos oda " + this.value + "/"+ this.max;
  alt.emit('changeFaceWeb', (motherFaceSlider.value, dadFaceSlider.value, motherSkinSlider.value, dadSkinSlider.value, faceMixSlider.value, skinMixSlider.value));
}

dadSkinSlider.oninput = function() {
  dadSkinLabel.innerHTML = "Tėvo oda " + this.value + "/"+ this.max;
  alt.emit('changeFaceWeb', (motherFaceSlider.value, dadFaceSlider.value, motherSkinSlider.value, dadSkinSlider.value, faceMixSlider.value, skinMixSlider.value));
}

faceMixSlider.oninput = function() {
  faceMixLabel.innerHTML = "Veidų skirtumas " + this.value/100 + "/"+ this.max/100;
  alt.emit('changeFaceWeb', (motherFaceSlider.value, dadFaceSlider.value, motherSkinSlider.value, dadSkinSlider.value, faceMixSlider.value, skinMixSlider.value));
}

skinMixSlider.oninput = function() {
  skinMixLabel.innerHTML = "Odos skirtumas " + this.value/100 + "/"+ this.max/100;
  alt.emit('changeFaceWeb', (motherFaceSlider.value, dadFaceSlider.value, motherSkinSlider.value, dadSkinSlider.value, faceMixSlider.value, skinMixSlider.value));
}

window.addEventListener('DOMContentLoaded', () => {
      hide();
});

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