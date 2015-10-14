var behaviour=["lc4", "jr4", "mj4", "lc1", "mj1", "mj8", "jr3", "mj3"];
var button_groups=["radio_behaviour_1", "radio_behaviour_2", "radio_behaviour_3", "radio_behaviour_4","radio_behaviour_5", "radio_behaviour_6", "radio_behaviour_7", "radio_behaviour_8"];
var button_values=[0, 0, 0, 0, 0, 0, 0, 0];
var situation;

function playBehaviour(behaviour){
	socket.emit("play_behaviour", behaviour);
	console.log(behaviour);
}

function getSelectedButton(){
	var tmp = document.getElementsByName('situation');
	situation = tmp[0].value;
	console.log(situation);
	
	for (var i = 0; i < button_groups.length; i++) {
		var radios = document.getElementById(button_groups[i]);
		for (var j = 0; j < radios.length; j++) {
			if (radios[j].type === 'radio' && radios[j].checked) {
				// get value, set checked flag or do whatever you need to
				button_values[i] = radios[j].value;			
			}
		}
	}
	
	for (var i = 0; i < button_groups.length; i++) {
		var alert_flag = 0;
		if (button_values[i] == 0) {
			alert_flag = 1;
		}
		console.log(button_values[i]);
	}
	
	if (alert_flag == 1) {
		alert("Please select a value for all behaviors.");
	}
	else {
		location.href='index2.html';
		socket.emit("submitted_data", behaviour, situation, button_values);
	}
}

function submitPreinfo(){
	var number = document.getElementsByName('participantnumber');
	number = number[0].value;
	console.log(number);
	var order = document.getElementsByName('bitorder');
	order = order[0].value;
	console.log(order);
	location.href='/public/demographics.html';
	socket.emit("submitted_preinfo", number, order);
}