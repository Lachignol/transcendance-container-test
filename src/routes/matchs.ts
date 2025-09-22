import type { FastifyInstance } from 'fastify';
import { sendFormCreateMatch, getMatchById, createMatch, setMatchHasCancel, setMatchHasFinished, deleteMatch } from '../controllers/matchs.ts'
import {
	makeCreateMatchValidationForm, makeDelMatchValidationParams, makeGetMatchValidationParams, makeMatchHasCancelValidationForm, makeMatchHasFinishValidationForm
} from '../validation/matchs_validation.ts'

export default async (app: FastifyInstance) => {

	app.get('/createMatch/', sendFormCreateMatch);
	app.post('/createMatch/', { schema: makeCreateMatchValidationForm() }, createMatch);
	app.get('/match/:id', { schema: makeGetMatchValidationParams() }, getMatchById);
	app.post('/setHasFinishedMatch/', { schema: makeMatchHasFinishValidationForm() }, setMatchHasFinished);
	app.post('/setHasCancelMatch/', { schema: makeMatchHasCancelValidationForm() }, setMatchHasCancel);
	app.delete('/deleteMatch/:id', { schema: makeDelMatchValidationParams() }, deleteMatch);
};
