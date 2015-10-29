var scr = document.createElement("script");
scr.type = "text/javascript";
scr.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
$("head").append(scr);

console.log("getSite.js has injected")

var host = "http://acces-lajoskapusi.c9.io:8080/"
var proxy = 'https://jsonp.afeld.me/?url=';
var original = "";
var url = "";
var q = "?searchInput=";
var q_path = "/search/"
var uri = URI(document.location)
var c = 0;

if (uri.search() && uri.pathname() == q_path) {
	var s = uri.search();
	ds = decodeURIComponent(s);
	original = ds.replace(q, "");
	getSite(original);
}

function addStyle() {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '* {background-color: black !important; color: yellow !important; text-shadow: none !important; box-shadow: none !important;} div {background-color: black !important;}' + 'pre:hover, code:hover, p:hover, span:hover, a:hover, li:hover, h2:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover, article:hover, strong:hover {color: orange !important} a:focus{color:orange !important;}';
	document.getElementsByTagName('head')[0].appendChild(style);
}

function validateURL(original) {
	return true;
}

function repair_site_src_href(data, sourceUrl) {
	var patt1 = /src="(?!http|\/\/)/g;
	var patt1_2 = /src='(?!http|\/\/)/g;
	var patt2 = /href="(?!http|\/\/)/g;
	var patt2_2 = /href='(?!http|\/\/)/g;
	var patt3 = /url\((?!http|\/\/)/g;
	var patt4 = /content="(?!http|\/\/)/g;
	res = data.replace(patt1, 'src="' + sourceUrl + "/");
	res = res.replace(patt1_2, "src='" + sourceUrl + "/")
	res = res.replace(patt2, 'href="' +  sourceUrl + '/');
	res = res.replace(patt2_2, "href='" +  sourceUrl + '/');
	res = res.replace(patt3, "url(" + sourceUrl + "/");
	res = res.replace(patt4, "content=" + sourceUrl + "/");
	return {res};
}

function renderPage(HTMLstring) {
	document.open(q_path,'_self',false);
	document.write(HTMLstring);
	document.close();
	addStyle();
}

function getSite(original) {
if (validateURL(original)) {
		url = proxy + original;
		$.get(url, function(data) {
			var urig = new URI(original);
			var protocol = urig.protocol() + "://";
			//var subdom = urig.subdomain(); + ".";
			var hn = urig.hostname();
			sourceUrl = protocol + hn;
			r = repair_site_src_href(data, sourceUrl)
			if (r["res"] != undefined) {
				renderPage(r["res"]);
			}
		});
	}
}
