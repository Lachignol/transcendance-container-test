import type { FastifyRequest, FastifyReply } from 'fastify';

function websocketTest(connection, request: FastifyRequest) {

	connection.on("message", (message: string) => {
		try {
			const text = message.toString();
			if (connection.readyState === connection.OPEN) {
				connection.send(`test: ${text}`);
			}
		} catch (error) {
			console.error('Error processing message:', error);
		}
	});
}

let room = new Array();

function chat(connection, request: FastifyRequest) {

	const userId1 = request.user.id;
	const userId2 = request.params.userId;

	if (!room[userId1 + userId2]) {
		room[userId1 + userId2] = connection
	}
	else
		connection = room[userId1 + userId2];
	connection.on("message", (message: string) => {
		try {
			const text = message.toString();
			if (connection.readyState === connection.OPEN) {
				connection.send(`test: ${text}`);
			}
		} catch (error) {
			console.error('Error processing message:', error);
		}

	});
	connection.on("close", () => {
		delete room[userId1 + userId2];
	})




}


const sendChatPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.status(200).send(`<h1>Fastify chat Demo</h1>
	<label>ID de l'user a send :</label>
	<select name="userId" id="userId" required>
	<option value="">--Please choose an user--</option>
	</select>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type your message">
    <button onclick="sendMessage()">Send</button>`)

};

const sendWebsocketPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.status(200).send(`<h1>Fastify WebSocket Demo</h1>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type your message">
    <button onclick="sendMessage()">Send</button>`)

};

export {

	chat,
	websocketTest,
	sendWebsocketPage,
	sendChatPage,

}
