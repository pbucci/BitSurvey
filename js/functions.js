var behaviour=["lc4", "jr4", "mj4", "lc1", "mj1", "mj8", "jr3", "mj3"];

function playBehaviour(behaviour){
	socket.emit("play_behaviour",behaviour);
	console.log(behaviour);
}