import type { FastifyRequest, FastifyReply } from 'fastify';

const test = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/index.html');
};


const testMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
	console.log("on recupere bien le nom du fichier quon a uploader : ");
	return reply.status(200).send({ message: request.filename })
};

export {
	test,
	testMiddleware
};
