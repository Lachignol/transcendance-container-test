import fastify from 'fastify';
import formbody from '@fastify/formbody'
import cors from '@fastify/cors'


export function init_cors(app: fastify) {
	app.register(cors, {
		// put your options here
	})

}

export function init_reading_body_request(app: fastify) {
	// Pour lire les formulaire
	app.register(formbody);

}


