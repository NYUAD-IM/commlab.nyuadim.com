
var player = document.getElementById("player");
var playButton = document.getElementById("playButton");
var pauseBotton = document.getElementById("pauseButton");
var stopButton = document.getElementById("stopButton");


player.addEventListener("timeupdate", audioProgressing);
playButton.addEventListener("click", audioPlaying);
pauseButton.addEventListener("click", audioPaused);
stopButton.addEventListener("click", audioStopped);

function audioPlaying(){
player.play();
}


function audioPaused() {
player.pause();
}

function audioStopped(){
player.pause();
player.currentTime = 0;
}


function audioProgressing() {
	console.log(player.currentTime);
}
