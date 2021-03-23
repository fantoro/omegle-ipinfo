let scriptUrl = chrome.runtime.getURL("main.js");

window.onload = function() {
	let script = document.createElement("SCRIPT");
	script.type = "text/javascript";
	script.src = scriptUrl;
	document.body.appendChild(script);
}
