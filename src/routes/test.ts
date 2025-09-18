import type { FastifyInstance } from 'fastify';
import { test } from '../controllers/test.ts'
import { uploadFile, sendUploadForm } from '../utils/uploads.ts'

export default async (app: FastifyInstance) => {
	app.get('/', test);
	app.get('/upload', sendUploadForm);
	app.post('/upload/', uploadFile);

}

