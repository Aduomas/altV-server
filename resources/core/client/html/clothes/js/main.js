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

let hairSlider = document.getElementById("hair");
let hairColorHSlider = document.getElementById("hairHColor");
let hairColorSlider = document.getElementById("hairColor");
let hairSecondColorSlider = document.getElementById("hairSecColor");
let beardOpacitySlider = document.getElementById("beardOpacity");
let beardSlider = document.getElementById("beard");
let eyebrowsOpacitySlider = document.getElementById("eyebrowsOpacity");
let eyebrowsSlider = document.getElementById("eyebrows");
let faceColorSlider = document.getElementById("faceColor");
let faceSecColorSlider = document.getElementById("faceSecColor");

let hairLaberSlider = document.getElementById("hairLabel");
let hairColorLabel = document.getElementById("hairColorLabel");
let hairSecondColorLabel = document.getElementById("hairSecColorLabel");
let hairColorHLabel = document.getElementById("hairColorHLabel");
let beardLabel = document.getElementById("beardLabel");
let beardOpacityLabel = document.getElementById("beardOpacityLabel");
let eyebrowsOpacityLabel = document.getElementById("eyebrowsOpacityLabel");
let eyebrowsLabel = document.getElementById("eyebrowsLabel");
let faceColorLabel = document.getElementById("faceColorLabel");
let faceSecColorLabel = document.getElementById("faceSecColorLabel");

let faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value};
let facialArgs = {changeColor: true, id: [1, 2], cid: [beardSlider.value, eyebrowsSlider.value], opacity: [beardOpacitySlider.value / 100, eyebrowsOpacitySlider.value / 100], colorid: 1 ,color: faceColorSlider.value, secColor: faceSecColorSlider.value / 100};
let componentArgs = {cid: 2, did: hairSlider.value, tid: hairColorHSlider.value};;
let hColorArgs = {cid: hairColorSlider.value, hid: hairSecondColorSlider.value};

motherFaceSlider.oninput = function() {
  motherFaceLabel.innerHTML = "Motina " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value};
  alt.emit('changeFaceWeb', 1, faceArgs);
}

dadFaceSlider.oninput = function() {
  dadFaceLabel.innerHTML = "Tėvas " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value};
  alt.emit('changeFaceWeb', 1, faceArgs);
}

motherSkinSlider.oninput = function() {
  motherSkinLabel.innerHTML = "Motinos oda " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value};
  alt.emit('changeFaceWeb', 1, faceArgs);
}

dadSkinSlider.oninput = function() {
  dadSkinLabel.innerHTML = "Tėvo oda " + this.value + "/"+ this.max;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value};
  alt.emit('changeFaceWeb', 1, faceArgs);
}

faceMixSlider.oninput = function() {
  faceMixLabel.innerHTML = "Veidų skirtumas " + this.value/100 + "/"+ this.max/100;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value};
  alt.emit('changeFaceWeb', 1, faceArgs);
}

skinMixSlider.oninput = function() {
  skinMixLabel.innerHTML = "Odos skirtumas " + this.value/100 + "/"+ this.max/100;
  faceArgs = {motherFace: motherFaceSlider.value, dadFace: dadFaceSlider.value, motherSkin: motherSkinSlider.value, dadSkin: dadSkinSlider.value, faceMix: faceMixSlider.value, skinMix: skinMixSlider.value};
  alt.emit('changeFaceWeb', 1, faceArgs);
}
//
hairSlider.oninput = function() {
  hairLabel.innerHTML = "Plaukai " + this.value + "/"+ this.max;
  componentArgs = {cid: 2, did: this.value, tid: hairColorHSlider.value};
  alt.emit('changeFaceWeb', 4, componentArgs);
  alt.emit('retrieveDataFromAlt', (this.value));
}

hairColorSlider.oninput = function() {
  hairColorLabel.innerHTML = "Plauku spalva " + this.value + "/"+ this.max;
  hColorArgs = {cid: this.value, hid: hairSecondColorSlider.value};
  alt.emit('changeFaceWeb', 3, hColorArgs);
}

hairSecondColorSlider.oninput = function() {
  hairSecondColorLabel.innerHTML = "Plauku Antra spalva " + this.value + "/"+ this.max;
  hColorArgs = {cid: hairColorSlider.value, hid: this.value};
  alt.emit('changeFaceWeb', 3, hColorArgs);
}

hairColorHSlider.oninput = function() {
  hairHColorLabel.innerHTML = "Plauku spalvos atspalvis " + this.value + "/"+ this.max;
  componentArgs = {cid: 2, did: hairSlider.value, tid: this.value};
  alt.emit('changeFaceWeb', 4, componentArgs);
}

beardSlider.oninput = function() {
  beardLabel.innerHTML = "Barzda " + this.value + "/"+ this.max;
  facialArgs = {changeColor: true, id: [1, 2], cid: [beardSlider.value, eyebrowsSlider.value], opacity: [beardOpacitySlider.value / 100, eyebrowsOpacitySlider.value / 100], colorid: 1 ,color: faceColorSlider.value, secColor: faceSecColorSlider.value / 100};
  alt.emit('changeFaceWeb', 2, facialArgs);
}

beardOpacitySlider.oninput = function() {
  beardOpacityLabel.innerHTML = "Barzdos ryškumas " + this.value/100 + "/"+ this.max/100;
  facialArgs = {changeColor: true, id: [1, 2], cid: [beardSlider.value, eyebrowsSlider.value], opacity: [beardOpacitySlider.value / 100, eyebrowsOpacitySlider.value / 100], colorid: 1 ,color: faceColorSlider.value, secColor: faceSecColorSlider.value / 100};
  alt.emit('changeFaceWeb', 2, facialArgs);
}

eyebrowsSlider.oninput = function() {
  eyebrowsLabel.innerHTML = "Antakiai " + this.value + "/"+ this.max;
  facialArgs = {changeColor: true, id: [1, 2], cid: [beardSlider.value, eyebrowsSlider.value], opacity: [beardOpacitySlider.value / 100, eyebrowsOpacitySlider.value / 100], colorid: 1 ,color: faceColorSlider.value, secColor: faceSecColorSlider.value / 100};
  alt.emit('changeFaceWeb', 2, facialArgs);
}

eyebrowsOpacitySlider.oninput = function() {
  eyebrowsOpacityLabel.innerHTML = "Antakių ryškumas " + this.value/100 + "/"+ this.max/100;
  facialArgs = {changeColor: true, id: [1, 2], cid: [beardSlider.value, eyebrowsSlider.value], opacity: [beardOpacitySlider.value / 100, eyebrowsOpacitySlider.value / 100], colorid: 1 ,color: faceColorSlider.value, secColor: faceSecColorSlider.value / 100};
  alt.emit('changeFaceWeb', 2, facialArgs);
}

faceColorSlider.oninput = function() {
  faceColorLabel.innerHTML = "Veido plaukų spalva " + this.value + "/"+ this.max;
  facialArgs = {changeColor: true, id: [1, 2], cid: [beardSlider.value, eyebrowsSlider.value], opacity: [beardOpacitySlider.value / 100, eyebrowsOpacitySlider.value / 100], colorid: 1 ,color: faceColorSlider.value, secColor: faceSecColorSlider.value / 100};
  alt.emit('changeFaceWeb', 2, facialArgs);
}

faceSecColorSlider.oninput = function() {
  faceSecColorLabel.innerHTML = "Veido plaukų antra spalva " + this.value + "/"+ this.max;
  facialArgs = {changeColor: true, id: [1, 2], cid: [beardSlider.value, eyebrowsSlider.value], opacity: [beardOpacitySlider.value / 100, eyebrowsOpacitySlider.value / 100], colorid: 1 ,color: faceColorSlider.value, secColor: faceSecColorSlider.value / 100};
  alt.emit('changeFaceWeb', 2, facialArgs);
}

//



window.addEventListener('DOMContentLoaded', () => {
    hide();
});

function sendFaceData(){
    alt.emit('changeFaceWeb', 5, 0, faceArgs, facialArgs, componentArgs, hColorArgs);
    alt.emit('charCamera', true);
}

function show()
{
    document.getElementsByTagName("body")[0].style.display = "block";
}

function hide()
{   
    document.getElementsByTagName("body")[0].style.display = "none";
}

function loadDataFromAlt(args){
  hairColorHSlider.max = args;
  hairHColorLabel.innerHTML = "Plauku spalvos atspalvis " + hairColorHSlider.value + "/" + hairColorHSlider.max;
  hairColorHSlider.value = 0;
}

if('alt' in window){
  alt.on('show', show);
  alt.on('hide', hide);
  alt.on('loadDataFromAlt', (args) => {
      loadDataFromAlt(args);
  });
}