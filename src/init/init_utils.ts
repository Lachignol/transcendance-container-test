import type { FastifyInstance } from 'fastify';
import formbody from '@fastify/formbody'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { validateFile } from '../utils/uploads.ts';
import { uploadsDir } from '../server.ts'
import path from 'path';
import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

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



export function init_app_upload_middleware(app: FastifyInstance) {
	app.decorate(
		'upload',
		async (request: FastifyRequest, reply: FastifyReply) => {

			const data = await request.file();
			if (!data) {

				return reply.code(400).send({ error: 'No file uploaded' });

			}
			if (validateFile(data.filename) == false) {

				return reply.code(400).send({
					error: 'File validation failed',
				});

			}
			const ext = data.filename.substring(data.filename.lastIndexOf('.'));
			const uniqueFilename = `${randomUUID()}${ext}`;
			const filepath = path.join(uploadsDir, uniqueFilename);
			console.log(uniqueFilename);
			try {
				await pipeline(data.file, createWriteStream(filepath));
				// a remplacer par profile picture ou peu importe le champ que l'on choisi '
				request.filename = uniqueFilename;
			} catch (error) {
				console.log(error);
				return reply.code(500).send({ error: 'Failed to save file' });
			}
		},
	)
}
