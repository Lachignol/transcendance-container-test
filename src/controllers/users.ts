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
	return reply.status(200).send(`
				      <h1>Tester les routes API Utilisateurs</h1>
	<h2> Formulaire Création Utilisateur(POST) </h2>
	<form id="createUserForm" method="post" action="/api/createUser/">
	<label>Nom : <input type="text" name = "name" required /> </label><br / >
	<label>Email : <input type="email" name = "email" required /> </label><br / >
	<label>Password : <input type="password" name = "password" required /> </label><br / >
	<button type="submit" > Créer </button>
	</form>

	<h2> Afficher un utilisateur(GET) </h2>
	<form id ="getUserForm">
	<label>ID : <input type="number" id="userId" required/> </label>
	<button type="button" onclick="fetchUser()"> Afficher </button>
	</form>
	<pre id="userResult"></pre>

	<h2> Modification utilisateur(PUT) </h2>
	<form method ="post" action ="/api/modifyUser/" enctype ="multipart/form-data">
	<label>ID : <input type="number" name="id" required/> </label><br />
	<label>Nouveau nom : <input type="text" name="name"/> </label><br />
	<label>Nouvel email : <input type="email" name="email"/> </label><br />
	<label>photo de profil : <input type="File" name="file"/> </label><br />
	<label>Nouvel password : <input type="password" name="password"/> </label><br / >
	<button type="submit" > Modifier </button>
	</form>`);


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

		const idstr = request.body.id.value
		const id = parseInt(idstr, 10);
		const email = request.body.email.value
		const name = request.body.name.value
		const password = request.body.password.value
		const picture = request.body.picture


		// gerer si on change de picture suprimer l'ancienne lie au user de toute facon on va plutot requeter l'user en question et afficher ces value dans la page profil et si il fait un changement et que dpnc un des champ est different de ce quon a en base on update

		if (!email && !name && !password && !picture) {
			return reply.status(400).send({ error: 'nothing to update' })
		}
		if (email && name && password && picture) {
			User = await request.server.prisma.User.update({ where: { id: id }, data: { name: name, email: email, password: password, picture: picture } });
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
		if (picture) {
			User = await request.server.prisma.User.update({ where: { id: id }, data: { picture: picture } });
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
