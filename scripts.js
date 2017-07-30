var player = document.querySelector(".player");
	
var button = document.querySelectorAll(".track__button");

player.onclick = function(event) {
	var target = event.target; 
	var sound = target.nextElementSibling.dataset.sound;
	
	while (target != this) {  
		if (target.className == 'track__button') { 
			activeButton(target);				   
			playTrack(sound);
			return;								   
		}
		return; 
	} 
};

function activeButton(press){
	press.classList.add('active');
}

function playTrack(sound){
	track = new Audio();
	track.src = sound;
	track.play();
}