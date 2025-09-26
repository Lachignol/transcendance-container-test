let ws = null;
let messages = document.getElementById('messages');

fetchAllUsers()

document.getElementById('messageInput').addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
		sendMessage();
	}

})

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
			select1.innerHTML += `<option value='${user.id}'>${user.id}</option >`
		}
		);
	}
	else if (response.status == 404) {
		document.getElementById('usersResult').textContent = 'fetching users not work bro';

	} else {
		document.getElementById('usersResult').textContent = 'Erreur: ' + response.message;
	}
}


if (ws != null) {
	ws.onmessage = function(event) {
		const messageDiv = document.createElement('div');
		messageDiv.textContent = event.data;
		messages.appendChild(messageDiv);
		messages.scrollTop = messages.scrollHeight;
	};
};

function sendMessage() {
	let userTosend = document.getElementById('userId').value
	if (userTosend != null) {
		ws = new WebSocket(`/api/chat/${userTosend}/`)
		const input = document.getElementById('messageInput');
		if (input.value) {
			ws.send(input.value);
			input.value = '';
		}
	}
}

