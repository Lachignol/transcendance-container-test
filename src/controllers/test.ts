import type { FastifyRequest, FastifyReply } from 'fastify';

const test = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/index.html');
};

export {
	test,
};
