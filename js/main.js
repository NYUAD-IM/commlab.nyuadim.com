$(document).ready(function(){
	console.log("IM is ready");

	$("#expandBoxAudio").click(function(){
		$("#audioInspiration").slideToggle();
	})

	$("#expandBoxVideo").click(function(){
		$("#videoInspiration").slideToggle();
	})

	$("#toggleNav").click(function(){
		$("#subNav").toggle();
	})
});