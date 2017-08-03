var player = document.querySelector('.player');
	
var track = new Audio();
var field;
var minutes;
var seconds;
var time = 0;
var interval;

player.onclick = function(event) {
	var target = event.target; 
	var sound = target.nextElementSibling.dataset.sound;
	field = target.nextElementSibling;
	minutes = field.children[2].children[0];
	seconds = field.children[2].children[1];
	
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
		start();
		press.classList.add('active');
		playtimeAnimate(field, track);
		
		timerId = setInterval(function(){	
			if (track.ended){ 
				setTimeout(function(){	
					press.classList.remove('active');
					getReset();
					clearInterval(timerId);
				},500);
			}
		},100);
	}	
	
	else if (track.currentTime > 0 && press.classList.contains('active')){
		track.pause();
		track.currentTime == 0;
		press.classList.remove('active');
		getReset();
		clearInterval(timerId);
	}
}
	
function playtimeAnimate(activeField, track){
	
	var timerId = setInterval(function(){
		var currentTime = track.currentTime;
		var duration = track.duration; 
		
		var pct = currentTime / ( duration / 100 );
		
		activeField.style.boxShadow = 'inset ' + activeField.clientWidth * ( pct / 100 ) + "1px -1px 1px 1px rgba(255, 204, 51, 1)";
		activeField.style.transition = '0.5s';
		
		if (track.ended || track.paused){
			setTimeout(function(){
				activeField.style.boxShadow = 'none';
				activeField.style.transition = '0.25s';
				clearInterval(timerId);
			},500);
		}
	}, 100);
}

function start(){
	interval = setInterval(incrementTime, 1000);
}

function incrementTime(){
	time++;

	var MIN = Math.floor(time / 60);
	var SEC = time % 60;

	minutes.innerText = fill(MIN);
	seconds.innerText = fill(SEC);
}

function getReset(){
	clearInterval(interval);

	time = 0;

	minutes.innerText = '00';
	seconds.innerText = '00';
}

function fill(x){
	if (x < 10){
		return '0' + x;
	} else {
		return x;
	}
}