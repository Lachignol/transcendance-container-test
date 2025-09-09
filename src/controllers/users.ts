

const getUserById = async (request, reply) => {
	const { idstr } = request.params;
	const id = parseInt(idstr, 10);
	if (isNaN(id)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	const User = await request.server.prisma.user.findUnique({ where: { id } });
	return reply.status(200).send(User);
};

const sendFormCreateUser = async (request, reply) => {
	return reply.sendFile('views/createUser.html');
};

const createUser = async (request, reply) => {
	try {
		const { email, name } = request.body

		if (!email) {
			return reply.status(400).send({ error: 'Email est requis' })
		}

		const user = await request.server.prisma.user.create({
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
};

const deleteUser = async (request, reply) => {
	const { idstr } = request.params;
	const id = parseInt(idstr, 10);

	if (isNaN(id)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	const deleteInfo = await request.server.prisma.user.deleteMany({ where: { id: id } });
	if (deleteInfo.count > 0) {
		return reply.status(200).send({ message: 'User delete with success' });
	} else {
		return reply.status(400).send({ message: 'User not found' });
	}
};



const updateUser = async (request, reply) => {
	const idstr = request.body.id;
	const id = parseInt(idstr, 10);
	let User;

	if (isNaN(id)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}

	try {
		const { email, name } = request.body

		if (!email && !name) {
			return reply.status(400).send({ error: 'nothing to update' })
		}
		if (email && name) {
			User = await request.server.prisma.user.update({ where: { id: id }, data: { name: name, email: email } });
		}
		if (email) {
			User = await request.server.prisma.user.update({ where: { id: id }, data: { email: email } });
		}
		if (name) {
			User = await request.server.prisma.user.update({ where: { id: id }, data: { name: name } });
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
	updateUser,
	deleteUser,
};
