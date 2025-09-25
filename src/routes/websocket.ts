import type { FastifyInstance } from 'fastify';
import { sendWebsocketPage, websocketTest } from '../controllers/websocket.ts'


export default async (app: FastifyInstance) => {
	app.get('/websocketPage/', sendWebsocketPage)
	app.get('/websocketTest/', { websocket: true }, websocketTest);
}
