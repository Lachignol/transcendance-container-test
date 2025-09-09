import type { FastifyInstance } from 'fastify';
import { test } from '../controllers/test.ts'

export default async (app: FastifyInstance) => {
	app.get('/', test);

}

