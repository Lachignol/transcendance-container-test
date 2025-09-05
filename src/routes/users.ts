import type { FastifyInstance } from 'fastify';

const route = async (app: FastifyInstance) => {

app.get('/', async (request, reply) => {
  reply.view('index', { title: 'Arthur' ,age: '1 ans comme mobutu'});
});

app.get('/profil/:idstr', async (request, reply) => {
	const {idstr}  = request.params;
	const id = parseInt(idstr,10);

	if (isNaN(id))
	{
		 return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	let User = await app.prisma.User.findUnique({where: { id: id}});
	return reply.view('profil', {User : User})
});















}

export default route;
