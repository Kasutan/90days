let xhr = new XMLHttpRequest(),
notes, occupied = false;
const container = document.getElementById("note-container");


// Get the JSON file
xhr.open('GET', "data.json");

xhr.addEventListener("readystatechange", function() { 
	if (xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 200 || xhr.status === 0)) { 
		start();
	}
});

xhr.send(null); 

//Create events handlers

function start(){
	notes = JSON.parse(xhr.responseText)["citations"];

	//Mouse events
	document.querySelector(".icon-chevron-right").onclick = function(){
		wait("slideOutRight")};
	document.querySelector(".icon-chevron-left").onclick = function(){
		wait("slideOutLeft")};
	container.onclick = function(){
		wait("fadeOut")};

	//Keyboard events
	document.addEventListener('keydown', function(e) {
		switch(e.keyCode) {
			case 38 : 
			console.log("touche haut");
			wait("slideOutUp");
			break;

			case 40 :
			wait("slideOutDown");
			break;

			case 37 :
			wait("slideOutLeft");
			break;

			case 39 :
			wait("slideOutRight");
			break;
		}
	}, true);
}

//Replace the note with a transition effect
function changeNote(transition) {
	occupied = true;
	let oldNote = document.querySelector(".note");

	//Create a new Note behind the existing one
	let indice = Math.floor((Math.random() * 77) );
	console.log("Here comes note number: "+indice);
	let newNote = oldNote.cloneNode(true);
	newNote.className = notes[indice].auteur+" note behind";
	newNote.firstChild.innerHTML = notes[indice].message;
	container.appendChild(newNote);

	//Change classes to manage the CSS transition
	oldNote.classList.add(transition);
	window.setTimeout(function(){
		newNote.classList.remove("behind");
		container.removeChild(oldNote);
		occupied = false;
	},800);
}

//Check that the previous change is finished before getting a new one
function wait(transition) {
	if (occupied) {
		console.log("Wait a second!");
	} else {
		console.log("Let's have a new note");
		changeNote(transition);
	} 
}
