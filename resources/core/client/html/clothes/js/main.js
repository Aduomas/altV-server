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
let faceArgs;

motherFaceSlider.oninput = function() {
  motherFaceLabel.innerHTML = "Motina " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value, status: false};
  alt.emit('changeFaceWeb', (faceArgs));
}

dadFaceSlider.oninput = function() {
  dadFaceLabel.innerHTML = "Tėvas " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value, status: false};
  alt.emit('changeFaceWeb', (faceArgs));
}

motherSkinSlider.oninput = function() {
  motherSkinLabel.innerHTML = "Motinos oda " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value, status: false};
  alt.emit('changeFaceWeb', (faceArgs));
}

dadSkinSlider.oninput = function() {
  dadSkinLabel.innerHTML = "Tėvo oda " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value, status: false};
  alt.emit('changeFaceWeb', (faceArgs));
}

faceMixSlider.oninput = function() {
  faceMixLabel.innerHTML = "Veidų skirtumas " + this.value/100 + "/"+ this.max/100;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value, status: false};
  alt.emit('changeFaceWeb', (faceArgs));
}

skinMixSlider.oninput = function() {
  skinMixLabel.innerHTML = "Odos skirtumas " + this.value/100 + "/"+ this.max/100;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value, status: false};
  alt.emit('changeFaceWeb', (faceArgs));
}

window.addEventListener('DOMContentLoaded', () => {
      hide();
});

function sendFaceData(){
  faceArgs.status = true;
  alt.emit('changeFaceWeb', (faceArgs));
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