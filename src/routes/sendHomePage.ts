import type { FastifyInstance } from 'fastify';
import { homePage, testMiddleware, testRouting } from '../controllers/sendHomePage.ts'
import { uploadFile, sendUploadForm, sendUploadMiddlewareForm } from '../utils/uploads.ts'

export default async (app: FastifyInstance) => {
	app.get('/', homePage);
	app.get('/test', testRouting);
	app.get('/upload', sendUploadForm);
	app.post('/upload/', uploadFile);
	app.get('/uploadMiddleware', sendUploadMiddlewareForm);
	app.post('/uploadMiddleware/', { preHandler: [app.upload] }, testMiddleware);

}

