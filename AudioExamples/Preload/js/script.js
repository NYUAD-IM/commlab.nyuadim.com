var audio = document.getElementById("audio");
var info = document.getElementById("info");

audio.addEventListener("canplay", canPlayInfo);
audio.addEventListener("canplaythrough", canPlayThroughInfo);

var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");
var stopButton = document.getElementById("stopButton");

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
stopButton.addEventListener("click", stopAudio);



function playAudio() {
	audio.play();
}

function pauseAudio() {
	audio.pause();
}

function stopAudio() {
	audio.pause();
	audio.currentTime = 0;
}

function canPlayInfo() {
	console.log("in can play");
	info.innerHTML = "Loading Audio";
}

function canPlayThroughInfo() {
	console.log("in can play through");
	info.innerHTML = "Listen Now";
}