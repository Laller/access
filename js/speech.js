console.log("speech.js has injectedd")

var RV = responsiveVoice;

function getInnermostHovered() {
	var n = document.querySelector(":hover");
	var nn;
	while (n) {
	nn = n;
	n = nn.querySelector(":hover");
	}
	return nn;
}

var content; 
var cs;

function getTextToRead() {
	if (getInnermostHovered() !== undefined) {
		content = (getInnermostHovered() || {}).textContent;
	}
	return content;
}

//responsiveVoice.setDefaultVoice("Hungarian Male");
function MouseOverReader() {
	$(document).mouseover(function () {
		console.log("mouseover is OK");
		content = getTextToRead();
		if (!RV.isPlaying() && content.split("\n").length <= 10) {
			//there are  big and complex DOM elements, RV wants to read all of the site. rethink!
			cs = content; //current speech
			//it should say that if cs is a link
			RV.speak(cs, "Hungarian Female");
			content = undefined;
		} else {
			if (content !== cs) {
				console.log("cs !== content")
				RV.cancel();
				content = getTextToRead();
				if (content.split("\n").length <= 10) {
					cs = content;
					RV.speak(cs, "Hungarian Female");
				}
			}
		
		}
	});
}

function TabFocusReader() {
	$( "*" ).focus(function() {
		console.log("tab focus is OK")
		RV.cancel();
		var cont = this.text;
		if (cont != undefined && !RV.isPlaying()) {
			RV.speak(cont, "Hungarian Female");
		} else {
			RV.cancel();
			console.log(this)
		}
	});
	
}
