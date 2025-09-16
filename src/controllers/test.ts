import type { FastifyReply } from 'fastify';

const test = async (reply: FastifyReply) => {
	return reply.sendFile('views/index.html');
};

export {
	test,
};
