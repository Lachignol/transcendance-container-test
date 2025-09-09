import type { FastifyInstance } from 'fastify';
import { getUserById, createUser, sendFormCreateUser, updateUser } from '../controllers/users.ts'

export default async (app: FastifyInstance) => {

	app.get('/createUser/', sendFormCreateUser);
	app.post('/createUser/', createUser);
	app.get('/user/:idstr', getUserById);
	app.post('/modifyUser/', updateUser);
};
