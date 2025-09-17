import type { FastifyRequest, FastifyReply } from 'fastify';

const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params;

	const idInt = parseInt(id, 10);
	if (isNaN(idInt)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	const User = await request.server.prisma.User.findUnique({
		where: { id: idInt }, include: {
			matchs: true
		}
	});
	if (User)
		return reply.status(200).send(User);
	return reply.status(404).send({ message: 'User not found' });
};


const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
	const Users = await request.server.prisma.User.findMany({
		include: {
			matchs: true
		}
	});
	if (Users)
		return reply.status(200).send(Users);
	return reply.status(404).send({ message: 'User not found' });
};

const sendFormCreateUser = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/createUser.html');
};



const createUserOAuth2 = async (request: FastifyRequest, email: string, name: string) => {
	try {
		if (!email) {
			return false;
		}
		const user = await request.server.prisma.User.create({
			data: {
				name: name,
				email: email,
				method: 'OAuth2',
			},
		})
		console.log("creation de l'user");
		console.log(user);
		if (!user)
			return false;
		return { user };
	} catch (error) {

		if (error.code === 'P2002') {
			// erreur unique constraint violation (email déjà existant)
			return false;
		}
		console.error(error)
		return false;
	}
};
const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const { name, email, password } = request.body

		if (!email) {
			return reply.status(404).send({ error: 'Email est requis' })
		}

		const user = await request.server.prisma.User.create({
			data: {
				name,
				email,
				password,
				method: 'Auth',
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
};

const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params;
	const idInt = parseInt(id, 10);

	if (isNaN(idInt)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	const deleteInfo = await request.server.prisma.User.deleteMany({ where: { id: idInt } });
	if (deleteInfo.count > 0) {
		return reply.status(200).send({ message: 'User delete with success' });
	} else {
		return reply.status(400).send({ message: 'User not found' });
	}
};



const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		let User;
		const { id, email, name, password } = request.body

		if (!email && !name && !password) {
			return reply.status(400).send({ error: 'nothing to update' })
		}
		if (email && name && password) {
			User = await request.server.prisma.User.update({ where: { id: id }, data: { name: name, email: email, password: password } });
		}
		if (email) {
			User = await request.server.prisma.User.update({ where: { id: id }, data: { email: email } });
		}
		if (name) {
			User = await request.server.prisma.User.update({ where: { id: id }, data: { name: name } });
		}
		if (password) {
			User = await request.server.prisma.User.update({ where: { id: id }, data: { password: password } });
		}
		if (!User) {
			return reply.status(400).send({ error: 'update not work' });
		} else {
			return reply.status(201).send(User)
		}
	} catch (error) {

		if (error.code === 'P2002') {
			// erreur unique constraint violation (email déjà existant)
			return reply.status(409).send({ error: 'Email déjà utilisé' })
		}
		console.error(error)
		return reply.status(500).send({ error: 'Erreur serveur' })
	}
};

export {
	getUserById,
	getAllUsers,
	sendFormCreateUser,
	createUser,
	createUserOAuth2,
	updateUser,
	deleteUser,
};
