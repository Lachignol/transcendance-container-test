import type { FastifyRequest, FastifyReply } from 'fastify';

const test = async (request: FastifyRequest, reply: FastifyReply) => {

	return reply.type('text/html').send(
		`
	<h1>Home-page</h1>
	<a href="createUser/" data-link>create User</a>
	<a href="test" data-link>not found</a>
	<a href="http://google.com">google</a>
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
	test,
	testMiddleware,
	testRouting,
};
