import type { FastifyRequest, FastifyReply } from 'fastify';

const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params;

	const idInt = parseInt(id, 10);
	if (isNaN(idInt)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	const User = await request.server.prisma.user.findUnique({ where: { id: idInt } });
	if (User)
		return reply.status(200).send(User);
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
		const user = await request.server.prisma.user.create({
			data: {
				name: name,
				email: email,
			},
		})
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

		const user = await request.server.prisma.user.create({
			data: {
				name,
				email,
				password,
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
	const deleteInfo = await request.server.prisma.user.deleteMany({ where: { id: idInt } });
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
			User = await request.server.prisma.user.update({ where: { id: id }, data: { name: name, email: email, password: password } });
		}
		if (email) {
			User = await request.server.prisma.user.update({ where: { id: id }, data: { email: email } });
		}
		if (name) {
			User = await request.server.prisma.user.update({ where: { id: id }, data: { name: name } });
		}
		if (password) {
			User = await request.server.prisma.user.update({ where: { id: id }, data: { password: password } });
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
	sendFormCreateUser,
	createUser,
	createUserOAuth2,
	updateUser,
	deleteUser,
};
