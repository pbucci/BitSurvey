 //var behaviour=[];
var button_groups=["radio_behaviour_1", "radio_behaviour_2", "radio_behaviour_3", "radio_behaviour_4","radio_behaviour_5", "radio_behaviour_6", "radio_behaviour_7", "radio_behaviour_8"];
var button_values=[0, 0, 0, 0, 0, 0, 0, 0];
var situation = '';

function playTrainingBehaviour(behaviour, situation_number){
	socket.emit("training_behaviour", behaviour, situation_number);
	//console.log(behaviour, situation_number);
}

function playTestBehaviour(behaviour, situation_number){
	socket.emit("test_behaviour", behaviour, situation_number);
	//console.log(behaviour, situation_number);
}

function getSituation() {
	console.log(situation);
	return situation;
}

function setSituation(data) {
	situation = data;
}

function logDragging(moved_behavior, bin_start, bin_end) {
	socket.emit("log_dragging", moved_behavior, bin_start, bin_end);
}

// for old radio buttons interface
function saveData(situation_index) {
	/* var tmp = document.getElementsByName('situation');
	situation = tmp[0].value; */
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
		if (button_values[i] == '') {
			alert_flag = 1;
		}
		console.log(button_values[i]);
	}
	
	if (alert_flag == 1) {
		alert("Please select a value for all behaviors.");
	}
	else {
		socket.emit("submitted_data", situation_index, button_values);
		if (situation_index == 0) {
			location.href='situation2.html';
		}
		else if (situation_index == 1) {
			location.href='situation3.html';
		}
		else if (situation_index == 2) {
			location.href='situation4.html';
		}
		else if (situation_index == 3) {
			location.href='summary.html';
		}
	}
}

/* function showSummary() {
	location.href='/public/summary.html';
} */

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
	
function submitDemographics() {
	
	var alert_flag = 0;
	var age = document.getElementsByName('age');
	age = age[0].value;
	if (age.length == 0) {
		alert_flag = 1;
	}
	console.log(age);
	
	var gender = '';
	var radios = document.getElementsByName('gender');
	for (var j = 0; j < radios.length; j++) {
		if (radios[j].type === 'radio' && radios[j].checked) {
			// get value, set checked flag or do whatever you need to
			gender = radios[j].value;			
		}
	}
	if (gender == 'other') {
		gender = document.getElementsByName('gender_other');
		gender = gender[0].value;
	}
	if (gender.length == 0) {
		alert_flag = 1;
	}
	console.log(gender);
	
	var education = '';
	radios = document.getElementsByName('education');
		for (var j = 0; j < radios.length; j++) {
		if (radios[j].type === 'radio' && radios[j].checked) {
			// get value, set checked flag or do whatever you need to
			education = radios[j].value;			
		}
	}
	if (education.length == 0) {
		alert_flag = 1;
	}
	console.log(education);
	
	var primary_language = '';
	primary_language = document.getElementsByName('primary_language');
	primary_language = primary_language[0].value;
	if (primary_language.length == 0) {
		alert_flag = 1;
	}
	console.log(primary_language);
	
	var secondary_language = '';
	secondary_language = document.getElementsByName('secondary_language');
	secondary_language = secondary_language[0].value;
	if (secondary_language.length == 0) {
		alert_flag = 1;
	}
	console.log(secondary_language);
	
	var pet_interaction = '';
	radios = document.getElementsByName('pet_interaction');
		for (var j = 0; j < radios.length; j++) {
		if (radios[j].type === 'radio' && radios[j].checked) {
			// get value, set checked flag or do whatever you need to
			pet_interaction = radios[j].value;			
		}
	}
	if (pet_interaction.length == 0) {
		alert_flag = 1;
	}
	console.log(pet_interaction);
	
	var pet_liking = '';
	radios = document.getElementsByName('pet_liking');
		for (var j = 0; j < radios.length; j++) {
		if (radios[j].type === 'radio' && radios[j].checked) {
			// get value, set checked flag or do whatever you need to
			pet_liking = radios[j].value;			
		}
	}
	if (pet_liking.length == 0) {
		alert_flag = 1;
	}
	console.log(pet_liking);
	
	if (alert_flag == 1) {
		alert("Please answer all questions before proceeding.");
	}
	else {
		location.href='training1.html';
		socket.emit("submitted_demographics", age, gender, education, primary_language, secondary_language, 
			pet_interaction, pet_liking);
	}
	
}

 $(function() {
   $( "#scenario1 ul.droptrue" ).sortable({
     connectWith: "ul",
     containment:"#scenario1"
   });

    $( "#scenario2 ul.droptrue" ).sortable({
        connectWith: "ul",
        containment:"#scenario2"
    });

    $( "#scenario3 ul.droptrue" ).sortable({
        connectWith: "ul",
        containment:"#scenario3"
    });

    $( "#scenario4 ul.droptrue" ).sortable({
        connectWith: "ul",
        containment:"#scenario4"
    });

   $( "#sortable1, #sortable2, #sortable3" ).disableSelection();
 });
