import type { FastifyInstance } from 'fastify';
import { getUserById, createUser, sendFormCreateUser, updateUser } from '../controllers/users.ts'
import { makeCreateUserValidationForm, makeUpdateUserValidationForm, makeGetUserValidationParams } from '../validation/users_validation.ts'

export default async (app: FastifyInstance) => {

	app.get('/createUser/', sendFormCreateUser);
	app.post('/createUser/', { schema: makeCreateUserValidationForm() }, createUser);
	app.get('/user/:idstr', { schema: makeGetUserValidationParams() }, getUserById);
	app.post('/modifyUser/', { schema: makeUpdateUserValidationForm() }, updateUser);
};
