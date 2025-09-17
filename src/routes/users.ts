import type { FastifyInstance } from 'fastify';
import { getUserById, createUser, sendFormCreateUser, updateUser, deleteUser, getAllUsers } from '../controllers/users.ts'
import { makeCreateUserValidationForm, makeUpdateUserValidationForm, makeGetUserValidationParams, makeDelUserValidationParams } from '../validation/users_validation.ts'


// ajouter tous les schema de validation personalise
export default async (app: FastifyInstance) => {

	app.get('/createUser/', sendFormCreateUser);
	app.post('/createUser/', { schema: makeCreateUserValidationForm() }, createUser);
	app.get('/user/:id', { schema: makeGetUserValidationParams() }, getUserById);
	app.get('/getAllUsers/', getAllUsers);
	app.post('/modifyUser/', { schema: makeUpdateUserValidationForm() }, updateUser);
	app.delete('/deleteUser/:id', { schema: makeDelUserValidationParams() }, deleteUser);
};
