import type { FastifyInstance } from 'fastify';

const route = async (app: FastifyInstance) => {

app.get('/', async (request, reply) => {
  reply.view('index', { title: 'Arthur' ,age: '1 ans comme mobutu'});
});

app.get('/user/:idstr', async (request, reply) => {
	const {idstr}  = request.params;
	const id = parseInt(idstr,10);

	if (isNaN(id))
	{
		 return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	let User = await app.prisma.User.findUnique({where: { id: id}});
	return reply.view('profil', {User : User})
});


app.get('/user/create', async (request, reply) => {
	return reply.view('createUser');
});

app.post('/user/create', async (request, reply) => {
    try {
    const { email, name } = request.body

    if (!email) {
      return reply.status(400).send({ error: 'Email est requis' })
    }

    // Création utilisateur Prisma
    const user = await app.prisma.user.create({
      data: {
        email,
        name,
      },
    })
	return reply.status(201).send(user)
  } catch (error) {

    if (error.code === 'P2002') {
      // erreur unique constraint violation (email déjà existant)
      return reply.status(409).send({ error: 'Email déjà utilisé' })
    }
    console.error(error)
    return reply.status(500).send({ error: 'Erreur serveur' })
  }
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
