const ws = new WebSocket('/api/websocket/');
const messages = document.getElementById('messages');

ws.onmessage = function(event) {
	const messageDiv = document.createElement('div');
	messageDiv.textContent = event.data;
	messages.appendChild(messageDiv);
	messages.scrollTop = messages.scrollHeight;
};

function sendMessage() {
	const input = document.getElementById('messageInput');
	if (input.value) {
		ws.send(input.value);
		input.value = '';
	}
}

// document.getElementById('messageInput').addEventListener('keypress', function(e) {
// 	if (e.key === 'Enter') {
// 		sendMessage();
// 	}
// });
