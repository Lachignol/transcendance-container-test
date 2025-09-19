import type { FastifyInstance } from 'fastify';
import { test, testMiddleware, testRouting } from '../controllers/test.ts'
import { uploadFile, sendUploadForm, sendUploadMiddlewareForm } from '../utils/uploads.ts'

export default async (app: FastifyInstance) => {
	app.get('/', test);
	app.get('/test', testRouting);
	app.get('/upload', sendUploadForm);
	app.post('/upload/', uploadFile);
	app.get('/uploadMiddleware', sendUploadMiddlewareForm);
	app.post('/uploadMiddleware/', { preHandler: [app.upload] }, testMiddleware);

}

