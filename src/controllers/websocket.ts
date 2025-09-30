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


let room = new Map();

function connect(connection, request: FastifyRequest) {

	const userId1 = request.user.id;
	console.log("in fuction connect");

	if (!room.get(userId1)) {
		room.set(`${userId1}`, connection)
	} else {
		return;
	}

}


function disconnect(connection, request: FastifyRequest) {

	console.log("in function disconnect");
	const userId1 = request.user.id;
	if (room.get(userId1)) {
		room.delete(`${userId1}`)
	}

}

function chat(connection, request: FastifyRequest) {

	const userId1 = request.user.id;
	const user1 = request.user;
	const userId2 = request.params.userId;


	console.log("in chat function");

	if (!room.get(`${userId2}`) || !room.get(`${userId1}`)) {
		console.log("other User not connect");
		return;

	}
	connection.on("message", (message: string) => {
		try {
			console.log(room.get(`${userId2}`).readyState);

			const text = message.toString();
			if (room.get(`${userId2}`).readyState == 1) {
				console.log(text);
				room.get(`${userId2}`).send(`${user1.name}: ${text}`);
			}
			room.get(`${userId1}`).send(`Me: ${text}`);
		} catch (error) {
			console.error('Error processing message:', error);
		}

	});
	connection.on("close", () => {
		room.delete(`${userId1}`)
	})




}

const sendChatPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.status(200).send(`<h1>Fastify chat Demo</h1>
	<ul id="userId"> 
	</ul> 
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type your message">
<button onclick="sendMessage()">Send</button>
    `)

};

const sendWebsocketPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.status(200).send(`<h1>Fastify WebSocket Demo</h1>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type your message">
    <button onclick="sendMessage()">Send</button>`)

};

export {

	chat,
	disconnect,
	connect,
	websocketTest,
	sendWebsocketPage,
	sendChatPage,
}
