const myConnection = new WebSocket(`/api/connectToChat/`);
let ws = null;
let messages = document.getElementById('messages');
fetchAllUsers()

async function fetchAllUsers() {
	const select1 = document.getElementById("userId");

	if (!select1) {
		console.log("in return")
		return;
	}
	const response = await fetch('/api/getAllUsers/');
	if (response.ok) {
		const users = await response.json();
		users.forEach((user) => {
			select1.innerHTML += `
 <li><button onclick="openConnectionWithUser(${user.id})">chat with ${user.name}</button> </li>`
		}
		);
	}
	else if (response.status == 404) {
		document.getElementById('usersResult').textContent = 'fetching users not work bro';

	} else {
		document.getElementById('usersResult').textContent = 'Erreur: ' + response.message;
	}
}

async function openConnectionWithUser(userToSend) {
	ws = new WebSocket(`/api/chat/${userToSend}/`)
}


myConnection.onmessage = function(event) {
	const messageDiv = document.createElement('div');
	messageDiv.textContent = event.data;
	messages.appendChild(messageDiv);
	messages.scrollTop = messages.scrollHeight;
};

function sendMessage() {
	const input = document.getElementById('messageInput');
	if (!ws) {
		input.value = "Click on one user";
		return;
	}

	if (input.value) {
		ws.send(input.value);
		input.value = '';
	}
}



document.getElementById('messageInput').addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		sendMessage();
	}

})
