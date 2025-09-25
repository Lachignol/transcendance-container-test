import type { FastifyRequest, FastifyReply } from 'fastify';

function websocketTest(connection, request: FastifyRequest) {

	console.log("dans ma fonction");
	connection.on("message", message => {
		try {
			console.log("bonjour");


			const text = message.toString();
			console.log(text);
			// Check if connection is still open before sending
			if (connection.readyState === connection.OPEN) {
				connection.send(`Echo: ${text}`);
			}

		} catch (error) {
			console.error('Error processing message:', error);
		}
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
