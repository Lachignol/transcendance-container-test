import type { FastifyInstance } from 'fastify'
import websocket from '@fastify/websocket'

export function init_app_websocket(app: FastifyInstance) {
	app.register(websocket);
}
