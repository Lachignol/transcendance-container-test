import type { FastifyInstance } from 'fastify';
import { sendWebsocketPage, websocketTest, chat, sendChatPage } from '../controllers/websocket.ts'


export default async (app: FastifyInstance) => {
	app.get('/chatPage/', sendChatPage);
	app.get('/chat/:userId/', { preHandler: [app.authenticate], websocket: true }, chat);
	app.get('/websocketPage/', sendWebsocketPage)
	app.get('/websocketTest/', { websocket: true }, websocketTest);
}
