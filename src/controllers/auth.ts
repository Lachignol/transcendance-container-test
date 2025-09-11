import type { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt'
import { createUser } from '../controllers/users.ts'

const login = async (request: FastifyRequest, reply: FastifyReply) => {
	const { email, password } = request.body;

	const User = await request.server.prisma.user.findUnique({ where: { email: email } });
	if (!User)
		return reply.status(400).send({
			error: ' User not found'
		});
	const match = await bcrypt.compare(password, User.password);

	if (match) {
		// add jwt etc
		return reply.status(200).send(User);
	};
	return reply.status(400).send({
		error: 'wrong password'
	});

};

const sendLoginPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/login.html');
};

const sendSignUpPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/signUp.html');
};


const signUp = async (request: FastifyRequest, reply: FastifyReply) => {

	const { name, email, password } = request.body;

	const saltRounds = 10; // a mettre dans .env ou vault si on le fait

	const hash = bcrypt.hashSync(password, saltRounds);
	const user = await request.server.prisma.user.create({
		data: {
			name,
			email,
			password: hash,
		},
	})
	if (user) {
		return reply.status(200).send({
			message: 'User suscribe with success',

		});
	}
	return reply.status(400).send({
		error: "we can't suscribe this user",
	});
};

const logout = async (request: FastifyRequest, reply: FastifyReply) => {
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


export {
	login,
	logout,
	signUp,
	sendLoginPage,
	sendSignUpPage,
};
