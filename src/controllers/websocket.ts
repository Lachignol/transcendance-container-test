import type { FastifyRequest, FastifyReply } from 'fastify';
import websocket from '@fastify/websocket'


const websocketTest = async (connection, request: FastifyRequest) => {
	const clientIP = request.socket.remoteAddress;
	console.log(`Client connected from ${clientIP}`);

	connection.send('Connected to Fastify WebSocket server!');
	connection.on('message', message => {
		try {
			const text = message.toString();
			console.log(`Received from ${clientIP}:`, text);
			// Check if connection is still open before sending
			if (connection.readyState === connection.OPEN) {
				connection.send(`Echo: ${text}`);
			}

		} catch (error) {

			console.error('Error processing message:', error);
		}

	});
	// Handle WebSocket errors
	connection.on('error', (error) => {

		console.error(`WebSocket error for ${clientIP}:`, error);

	});
	connection.on('close', (code, reason) => {

		console.log(`Client ${clientIP} disconnected - Code: ${code}, Reason: ${reason?.toString() || 'none'}`);

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
