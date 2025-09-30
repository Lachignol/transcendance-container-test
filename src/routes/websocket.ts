import type { FastifyInstance } from 'fastify';
import {
	sendWebsocketPage, websocketTest, chat, sendChatPage, connect, disconnect
} from '../controllers/websocket.ts'


export default async (app: FastifyInstance) => {
	app.get('/chatPage/', { preHandler: [app.authenticate] }, sendChatPage);
	app.get('/connectToChat/', { preHandler: [app.authenticate], websocket: true }, connect);
	app.get('/disconnectToChat/', { preHandler: [app.authenticate], websocket: true }, disconnect);
	app.get('/chat/:userId/', { preHandler: [app.authenticate], websocket: true }, chat);
	app.get('/websocketPage/', sendWebsocketPage)
	app.get('/websocketTest/', { websocket: true }, websocketTest);
}
