import type { FastifyInstance } from 'fastify';
import { sendLoginPage, sendSignUpPage, login, logout, signUp, test } from '../controllers/auth.ts'
import { makeLoginValidationForm, makeSignUpValidationForm } from '../validation/auth_validation.ts'

export default async (app: FastifyInstance) => {

	app.get('/login', sendLoginPage);
	app.get('/signUp', sendSignUpPage);
	app.post('/signUp', { schema: makeSignUpValidationForm() }, signUp);
	app.post('/login', { schema: makeLoginValidationForm() }, login);
	app.get('/logout', { preHandler: [app.authenticate] }, logout);
	app.get('/protected', { preHandler: [app.authenticate] }, test);
};
