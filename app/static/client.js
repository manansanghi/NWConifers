var el = x => document.getElementById(x);

var urlmap = {
  "Douglas Fir":"http://nwconifers.com/nwlo/douglas-fir.htm",
  "Western Hemlock":"http://nwconifers.com/nwlo/whemlock.htm",
  "Mountain Hemlock":"http://nwconifers.com/nwhi/mthemlock.htm",
  "Grand Fir":"http://nwconifers.com/nwlo/grandfir.htm",
  "Noble Fir":"http://nwconifers.com/nwhi/noblefir.htm",
  "Pacific Silver Fir":"http://nwconifers.com/nwhi/silverfir.htm",
  "Subalpine Fir":"http://nwconifers.com/nwhi/subalpinefir.htm",
  "White Fir":"http://nwconifers.com/sw/whitefir.htm",
  "Red Fir":"http://nwconifers.com/sw/redfir.htm",
  "Ponderosa Pine":"http://nwconifers.com/nwlo/ponderosa.htm",
  "Lodgepole Pine":"http://nwconifers.com/nwlo/lodgepole.htm",
  "Western White Pine":"http://nwconifers.com/nwhi/wwhitepine.htm",
  "Whitebark Pine":"http://nwconifers.com/nwhi/whitebarkpine.htm",
  "Jeffrey Pine":"http://nwconifers.com/sw/jeffrey.htm",
  "Knobcone Pine":"http://nwconifers.com/sw/knobcone.htm",
  "Sugar Pine":"http://nwconifers.com/sw/sugarpine.htm",
  "Limber Pine":"http://nwconifers.com/east/limberpine.htm",
  "Sitka Spruce":"http://nwconifers.com/nwlo/sitka.htm",
  "Engelmann Spruce":"http://nwconifers.com/nwhi/engelmann.htm",
  "Brewer Spruce":"http://nwconifers.com/sw/brewer.htm",
  "Western Larch":"http://nwconifers.com/nwhi/wlarch.htm",
  "Alpine Larch": "http://nwconifers.com/nwhi/alpinelarch.htm",
  "true cedars":"http://nwconifers.com/imports/deodar.htm",
  "Western Red Cedar":"http://nwconifers.com/nwlo/wredcedar.htm",
  "Incense Cedar":"http://nwconifers.com/nwhi/incense.htm",
  "Alaska Cedar":"http://nwconifers.com/nwhi/alaskacedar.htm",
  "Port Orford Cedar":"http://nwconifers.com/sw/portorfordcedar.htm",
  "Modoc Cypress":"http://nwconifers.com/sw/modoccypress.htm",
  "Western Juniper":"http://nwconifers.com/east/wjuniper.htm",
  "Rocky Mountain Juniper":"http://nwconifers.com/east/rockymtjuniper.htm",
  "Redwood":"http://nwconifers.com/sw/redwood.htm",
  "Pacific Yew":"http://nwconifers.com/nwlo/yew.htm"
}

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("result-id").innerHTML = `${response["result"]}`;
      el("result-id").href = urlmap[response["result"]];
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

