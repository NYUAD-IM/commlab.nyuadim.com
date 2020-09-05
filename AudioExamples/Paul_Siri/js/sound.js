var audio = document.getElementById("audio");
var image = document.getElementById("image");
var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");
var stopButton = document.getElementById("stopButton");
var body = document.getElementsByTagName("body")[0];
var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var button = document.getElementById("container");



audio.addEventListener("ended", reset);


audio.addEventListener("timeupdate", audioProgressed);

// playButton.addEventListener("click", audioPlay);
// pauseButton.addEventListener("click", audioPaused);
stopButton.addEventListener("click", audioStopped);

function audioPlay() {
	audio.play();
}

function reset(){
	image.src = "photos/siri.gif";
	body.style.backgroundColor = "#190C41";
	body.style.backgroundImage = "";
	text2.innerHTML = "Listen to their story."
	text1.innerHTML = "Paul meets Siri.";
	button.style.margin = "10px 10px";
	button.style.marginLeft="11.35%"
}

// function audioPaused() {
// 	audio.pause();
// }

function audioStopped() {
	audio.pause();
	audio.currentTime = 0;
	reset();
	audio.play();
}

function audioProgressed() {
	if (audio.currentTime > 135.5) {
		image.src = "photos/tiny.gif";
		body.style.backgroundColor = "black";
		body.style.backgroundImage = "url('photos/screen.jpg')";
		text2.innerHTML = "";
		text1.innerHTML = "";
		button.style.marginTop = "20%";
		button.style.marginLeft="11.35%";
	}
}


var timer;
var percent = 0;
var audio = document.getElementById("audio");
audio.addEventListener("playing", function(_event) {
  var duration = _event.target.duration;
  advance(duration, audio);
});
audio.addEventListener("pause", function(_event) {
  clearTimeout(timer);
});
var advance = function(duration, element) {
  var progress = document.getElementById("progress");
  increment = 10/duration
  percent = Math.min(increment * element.currentTime * 10, 100);
  progress.style.width = percent+'%'
  startTimer(duration, element);
}
var startTimer = function(duration, element){ 
  if(percent < 100) {
    timer = setTimeout(function (){advance(duration, element)}, 100);
  }
}

function togglePlay (e) {
  e = e || window.event;
  var btn = e.target;
  if (!audio.paused) {
    btn.classList.remove('active');
    audio.pause();
    isPlaying = false;
  } else {
    btn.classList.add('active');
    audio.play();
    isPlaying = true;
  }
}
