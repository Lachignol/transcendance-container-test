import type { FastifyRequest, FastifyReply } from 'fastify';

const homePage = async (request: FastifyRequest, reply: FastifyReply) => {

	return reply.status(200).send(
		`
	<h1>Home-page</h1>
	<ul>
	<li><a href="createUser/" data-link>Users</a></li>
	<li><a href="createMatch/" data-link>Match</a></li>
	<li><a href="login/" data-link>login</a></li>
	<li><a href="signUp/" data-link>signup</a></li>
	<li><a href="protected/" data-link>protected page</a></li>
	<li><a href="untrucquiexistepas/" data-link>not exisisting link</a></li>
	<li><a href="http://google.com">google</a></li>
	<ul>
`)
}

const testMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
	console.log("on recupere bien le nom du fichier quon a uploader : ");
	return reply.status(200).send({ message: request.filename })
};

const testRouting = async (Request: FastifyRequest, reply: FastifyReply) => {

	return reply.status(200).send('<a href="/" data-link>not found</a><p> ceci est la page de test <p>');
}

export {
	homePage,
	testMiddleware,
	testRouting,
};
