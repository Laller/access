console.log("speech.js has injectedd")

var RV = responsiveVoice;
var readers = {
		"TabFocusReader" : "on", 
		"MouseOverReader" : "on", 
		"SelectedTextReader" : "on"
	};

function getInnermostHovered() {
	var n = document.querySelector(":hover");
	var nn;
	while (n) {
	nn = n;
	n = nn.querySelector(":hover");
	}
	text = getTextFrom_DOM_Element(nn);
	return text;
}

function getTextFrom_DOM_Element(DOM_Element) {
	Etn = $(DOM_Element).get(0).tagName;
	Etc = DOM_Element.textContent;
	Ea = DOM_Element.alt
	switch(Etn) {
		case "IMG":
			if (Ea) {
				text = "Kep, aminek a leirasa: " + Ea;
			} else {
				text = "Kep, leiras nelkul."
			}
		break;

		case "A":
			text = "Link: " + Etc;
		break;

		default:
			text = Etc;
		}
	console.log("getTextFrom_DOM_Element said:", text, DOM_Element)
	return text;
}

function MouseOverReader() {
	console.log("mouseoverreader has called");
	var currentSpeak = "";
	$(document).mouseover(function () {
		if (readers.MouseOverReader == "on") {
			content = getInnermostHovered();
			if (content != currentSpeak){
				speakThis(content)
			}
			currentSpeak = content;
		}
	});
}

// tab focus is little buggy
function TabFocusReader() {
	console.log("tabfocusreader has called")
	$( "a" ).focus(function() {
		if (readers.TabFocusReader == "on") {
			DOM_Element = this;
			var content = getTextFrom_DOM_Element(DOM_Element);
			speakThis(content);
		}
	});
}

function SelectedTextReader() {
	console.log("slectedtextreader has called");
	$(document).mousedown(function() {
		RV.cancel();
		readers.MouseOverReader = "off";
	});
	$(document).mouseup(function(){
		if (readers.SelectedTextReader == "on") {
				content = window.getSelection().toString();
				if (content) {
					speakThis(content);
				} else {readers.MouseOverReader = "on"}
			} else {readers.MouseOverReader = "on";}
	});
}

function speakThis(content) {
	RV.cancel();
	var contLen = content.split("\n").length
	if (content != undefined && contLen <= 10) {
		RV.speak(content, "Hungarian Female");
		content = undefined;
	} else {console.log("too long content to read. sorry")}
}

$(document).ready(function() {
	var c = 0;
	function callReaders() {
		$.each(readers, function(index, value) {
			window[index]();
		});
	}
	var iv = setInterval(function() {
		if (document.readyState == "complete" && TabFocusReader) {
			clearInterval(iv);
			callReaders();
		} else {
			c++;
			if (c > 6) {clearInterval(iv), callReaders();}
		}
	}, 2000)
});
