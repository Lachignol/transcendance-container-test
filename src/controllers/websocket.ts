import type { FastifyRequest, FastifyReply } from 'fastify';
import type { WebSocket } from '@fastify/websocket';


function websocketTest(connection, request: FastifyRequest) {

	connection.socket.on("message", message => {
		// Echo the message back
		connection.socket.send("Echo: " + message);

	});

}


const sendWebsocketPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.status(200).send(`<h1>Fastify WebSocket Demo</h1>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type your message">
    <button onclick="sendMessage()">Send</button>`)

};

export {

	websocketTest,
	sendWebsocketPage,

}
