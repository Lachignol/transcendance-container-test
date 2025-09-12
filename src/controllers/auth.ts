import type { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';


const sendLoginPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/login.html');
};

const sendSignUpPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/signUp.html');
};


const sendTestPage = async (request: FastifyRequest, reply: FastifyReply) => {
	const user = request.user;
	console.log(user);
	return reply.sendFile('views/test.html');
}


const login = async (request: FastifyRequest, reply: FastifyReply) => {
	const { email, password } = request.body;

	const User = await request.server.prisma.user.findUnique({ where: { email: email } });
	const match = User && await bcrypt.compare(password, User.password);
	if (!User || !match) {
		return reply.code(401).send({
			message: 'Invalid email or password',
		})
	}
	const payload = {
		id: User.id,
		email: User.email,
		name: User.name,
	}
	const token = request.jwt.sign(payload);

	reply.setCookie('access_token', token, {
		path: '/',
		httpOnly: true,
		secure: true,
	})
	return { accessToken: token }
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
	reply.clearCookie('access_token');
	return reply.send({ message: 'Logout successful' })
};



export {
	login,
	logout,
	sendTestPage,
	signUp,
	sendLoginPage,
	sendSignUpPage,
};
