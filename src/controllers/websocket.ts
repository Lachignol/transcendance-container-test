import type { FastifyRequest, FastifyReply } from 'fastify';
import websocket from '@fastify/websocket'


const websocketTest = async (socket, request: FastifyRequest) => {
	socket.on('message', message => {
		// message.toString() === 'hi from client'
		socket.send('hi from server')
	})

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
