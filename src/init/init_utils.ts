import type { FastifyInstance } from 'fastify';
import formbody from '@fastify/formbody'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart';

export function init_cors(app: FastifyInstance) {
	app.register(cors, {
		origin: "*",
		credentials: true,
	})

}

export function init_reading_body_request(app: FastifyInstance) {
	// Pour lire les formulaire
	app.register(formbody);

}

export function init_reading_multipartFormData(app: FastifyInstance) {
	app.register(multipart);
}


