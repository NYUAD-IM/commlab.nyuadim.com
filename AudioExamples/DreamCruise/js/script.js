//controls for basic audioFile

var audioFile = document.getElementById("audio-file");
var playButton = document.getElementById("play-button");
var pauseButton = document.getElementById("pause-button");
var restartButton = document.getElementById("restart-button");
var slider = document.getElementById("slider");
var title = document.getElementById("title");
var dur = 0;
var playing = false;


// audioFile.addEventListener("play", audioPlaying);
// audioFile.addEventListener("pause", audioPaused);
// audioFile.addEventListener("ended", audioEnded);

audioFile.addEventListener('loadedmetadata', function() {
    dur = audioFile.duration;
});
audioFile.loop = false;


playButton.addEventListener("click", audioPlaying);
pauseButton.addEventListener("click", audioPaused);
restartButton.addEventListener("click", restartAudio);
audioFile.addEventListener("timeupdate", audioProgressing);
slider.oninput=function(){
	var jumpTime = this.value*dur/100;
	console.log("Jump Time: " + jumpTime);
	audioFile.currentTime= jumpTime;
	if(playing==true){
		playButton.style.display = "none";
		pauseButton.style.display = "block";
		restartButton.style.display = "none";
	}
	else{
		playButton.style.display = "block";
		pauseButton.style.display = "none";
		restartButton.style.display = "none";
	}
}



function audioPlaying() {
	audioFile.play();
	playButton.style.display = "none";
	pauseButton.style.display = "block";
	restartButton.style.display = "none";
	playing = true;
	document.body.style.backgroundColor = "black";
	title.style.color = "white";
	// document.querySelectorAll("*").forEach((el) => {
	// 	el.style.cursor = "url(./about/boat_white.png) 25 25,auto";
	// })
	// document.body.style.cursor = "url(../about/boat_white.png) 25 25,auto";
}

function audioPaused() {
	audioFile.pause();
	playButton.style.display = "block";
	pauseButton.style.display = "none";
	restartButton.style.display = "none";
	playing = false;
	document.body.style.backgroundColor = "white";
	title.style.color = "black";
	// document.querySelectorAll("*").forEach((el) => {
	// 	el.style.cursor = "url(./about/boat3.png) 25 25,auto";
	// })
}

audioFile.onended = function() {
	playButton.style.display = "none";
	pauseButton.style.display = "none";
	restartButton.style.display = "block";
	playing = false;
	document.body.style.backgroundColor = "white";
	title.style.color = "black";
	// document.querySelectorAll("*").forEach((el) => {
	// 	el.style.cursor = "url(./about/boat3.png) 25 25,auto";
	// })
};

function restartAudio() {
	audioFile.currentTime = 0;
	audioFile.play();
	playButton.style.display = "none";
	pauseButton.style.display = "block";
	restartButton.style.display = "none";
	document.body.style.backgroundColor = "black";
	title.style.color = "white";
	// document.querySelectorAll("*").forEach((el) => {
	// 	el.style.cursor = "url(./about/boat_white.png) 25 25,auto";
	// })
}

function audioProgressing() {
	var currentTime = audioFile.currentTime;
	console.log(currentTime);	
	console.log("slider value:" + slider.value);
	var value = currentTime*100/dur;
	slider.value=value;
	// slider.oninput=function(){
	// 	var jumpTime = this.value*dur/100;
	// 	console.log("Jump Time: " + jumpTime);
	// 	audioFile.currentTime= jumpTime;
	// 	if(playing==true){
	// 		playButton.style.display = "none";
	// 		pauseButton.style.display = "block";
	// 		restartButton.style.display = "none";
	// 	}
	// 	else{
	// 		playButton.style.display = "block";
	// 		pauseButton.style.display = "none";
	// 		restartButton.style.display = "none";
	// 	}
	// }
}



