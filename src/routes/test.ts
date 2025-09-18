import type { FastifyInstance } from 'fastify';
import { test, testMiddleware } from '../controllers/test.ts'
import { uploadFile, sendUploadForm, sendUploadMiddlewareForm } from '../utils/uploads.ts'

export default async (app: FastifyInstance) => {
	app.get('/', test);
	app.get('/upload', sendUploadForm);
	app.post('/upload/', uploadFile);
	app.get('/uploadMiddleware', sendUploadMiddlewareForm);
	app.post('/uploadMiddleware/', { preHandler: [app.upload] }, testMiddleware);

}

