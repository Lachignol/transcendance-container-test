const test = async (request, reply) => {
	return reply.sendFile('views/index.html');
};

export {
	test,
};
