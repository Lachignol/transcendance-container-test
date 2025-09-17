import type { FastifyRequest, FastifyReply } from 'fastify';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import { createUserOAuth2 } from '../controllers/users.ts'


const sendLoginPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/login.html');
};

const sendSignUpPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/signUp.html');
};


const sendWaitingPage = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/waitingPage.html');
}

const sendTestPage = async (request: FastifyRequest, reply: FastifyReply) => {
	const user = request.user;
	console.log(user);
	return reply.sendFile('views/protectedPage.html');
}

const callbackGoogle = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		// Récupérer le token d'accès d'authorization code
		const { token } = await request.server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, reply);
		// Appeler l'API Google Userinfo avec le token d'accès
		const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
			headers: {
				Authorization: `Bearer ${token.access_token}`,
			},
		});
		if (!userInfoResponse.ok) {
			throw new Error('Failed to fetch user info');
		}
		const userInfo = await userInfoResponse.json();
		// console.log('User info:', userInfo);
		const userEmail = userInfo.email;
		let User = await request.server.prisma.user.findUnique({ where: { email: userEmail } });
		console.log("user avant existance value:");
		console.log(User);

		if (!User) {
			User = await createUserOAuth2(request, userInfo.email, userInfo.given_name);
			if (User == false) {
				return reply.status(500).send({ error: 'Failed to suscribe new User' });
			}
		}
		User = await request.server.prisma.user.findUnique({ where: { email: userEmail } });
		console.log(User)
		const payload = {
			id: User.id,
			email: User.email,
			name: User.name,
			OAuth: token.access_token,
		}
		const authToken = request.jwt.sign(payload);
		reply.setCookie('access_token', authToken, {
			path: '/',
			httpOnly: true,
			secure: true,
		})
		return reply.redirect('/waitingPage');
	} catch (error) {
		request.log.error(error);
		return reply.status(500).send({ error: 'Failed to get user email' });
	}
};


const callback42 = async (request: FastifyRequest, reply: FastifyReply) => {
	const token = await request.server.ecole42OAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
	reply.send({ access_token: token.access_token });
}


const callbackGithub = async (request: FastifyRequest, reply: FastifyReply) => {

	const token = await request.server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
	reply.send({ access_token: token.access_token });

}

const login = async (request: FastifyRequest, reply: FastifyReply) => {
	const { email, password } = request.body;

	const User = await request.server.prisma.user.findUnique({ where: { email: email } });
	// a mettre fonction generique pour Oauth je pense 
	const isMatch = User && await bcrypt.compare(password, User.password);
	if (!User || !isMatch) {
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
	reply.redirect('/protected');
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
			method: 'Auth',
		},
	})
	if (user) {
		console.log('User suscribe with success');

		return reply.redirect('/login')
	}
	return reply.status(400).send({
		error: "we can't suscribe this user",
	});
};

const revokeGoogleToken = async (token: string) => {
	const url = 'https://oauth2.googleapis.com/revoke';
	const params = new URLSearchParams();
	params.append('token', token);

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: params.toString()
		});

		if (response.ok) {
			console.log('Token révoqué avec succès');
		} else {
			console.error('Échec de la révocation du token:', response.status, await response.text());
		}
	} catch (error) {
		console.error('Erreur lors de la révocation du token:', error);
	}
}


const logout = async (request: FastifyRequest, reply: FastifyReply) => {
	reply.clearCookie('access_token');
	if (request.user.OAuth) {
		revokeGoogleToken(request.user.OAuth);
	}
	return reply.status(200).send({ message: 'Logout successful' })
};



export {
	login,
	logout,
	sendTestPage,
	signUp,
	sendLoginPage,
	sendSignUpPage,
	sendWaitingPage,
	callbackGoogle,
	callbackGithub,
	callback42,
};
