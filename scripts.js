var player = document.querySelector(".player");
	
var button = document.querySelectorAll(".track__button");

var track = new Audio();

var field;

player.onclick = function(event) {
	var target = event.target; 
	var sound = target.nextElementSibling.dataset.sound;
	field = target.nextElementSibling;
	
	while (target != this) {  
		if (target.className == 'track__button' || target.className == 'track__button active') { 
			playTrack(sound, target);
			return;								   
		}
		return; 
	} 
};

function playTrack(sound, press){
	
	if (track.currentTime == 0 || track.paused){
		track.src = sound;
		track.play();
		press.classList.add('active');
		playtimeAnimate(field, track);
		
		timerId = setInterval(function(){	
			if (track.ended){ 
				setTimeout(function(){	
					press.classList.remove('active');
					clearInterval(timerId);
				},500);
			}
		},100);
	}	
	
	else if (track.currentTime > 0 && press.classList.contains('active')){
		track.pause();
		track.currentTime == 0;
		press.classList.remove('active');
		clearInterval(timerId);
	}
}
	
function playtimeAnimate(activeField, track){
	
	var timerId = setInterval(function(){
		var currentTime = track.currentTime;
		var duration = track.duration; 
		
		var pct = currentTime / ( duration / 100 );
		
		activeField.style.boxShadow = "inset " + activeField.clientWidth * ( pct / 100 ) + "px 0 0 0 rgba(255, 204, 51, 1)";
		activeField.style.transition = "0.5s";
		
		if (track.ended || track.paused){
			setTimeout(function(){
				activeField.style.boxShadow = "none";
				activeField.style.transition = "0.25s";
				clearInterval(timerId);
			},500);
		}
	}, 100);
}