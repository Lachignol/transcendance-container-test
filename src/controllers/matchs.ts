import type { FastifyRequest, FastifyReply } from 'fastify';

const sendFormCreateMatch = async (request: FastifyRequest, reply: FastifyReply) => {
	return reply.sendFile('views/createMatch.html');
};

const getMatchById = async (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params;

	const idInt = parseInt(id, 10);
	if (isNaN(idInt)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	const Match = await request.server.prisma.Match.findUnique({ where: { id: idInt } });
	if (Match)
		return reply.status(200).send(Match);
	return reply.status(404).send({ message: 'Match not found' });
};




const createMatch = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const { idUser1, idUser2 } = request.body

		if (idUser1 == idUser2) {
			return reply.status(404).send({ error: 'Les deux id sont du meme user' })
		}
		const match = await request.server.prisma.Match.create({
			data: {
				players: {
					connect: [{ id: idUser1 }, { id: idUser2 }]
				},
			},
		})
		return reply.status(201).send(match)
	} catch (error) {
		console.error(error)
		return reply.status(500).send({ error: 'Erreur serveur' })
	}
};

const deleteMatch = async (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params;
	const idInt = parseInt(id, 10);

	if (isNaN(idInt)) {
		return reply.status(400).send({ error: 'L\'ID doit être un nombre entier' });
	}
	const deleteInfo = await request.server.prisma.Match.deleteMany({ where: { id: idInt } });
	if (deleteInfo.count > 0) {
		return reply.status(200).send({ message: 'Match delete with success' });
	} else {
		return reply.status(400).send({ message: 'User not found' });
	}
};



const setMatchHasFinished = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		let Match;
		const { id } = request.body

		Match = await request.server.prisma.Match.update({ where: { id: id }, data: { isfinished: true } });
		if (!Match) {
			return reply.status(400).send({ error: 'update not work' });
		} else {
			return reply.status(201).send(Match)
		}
	} catch (error) {
		console.error(error);
		return reply.status(500).send({ error: 'Erreur serveur' })
	}
};


const setMatchHasCancel = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		let Match;
		const { id } = request.body

		Match = await request.server.prisma.Match.update({ where: { id: id }, data: { isCancel: true } });
		if (!Match) {
			return reply.status(400).send({ error: 'update not work' });
		} else {
			return reply.status(201).send(Match)
		}
	} catch (error) {
		console.error(error);
		return reply.status(500).send({ error: 'Erreur serveur' })
	}
};

export {
	getMatchById,
	sendFormCreateMatch,
	createMatch,
	setMatchHasFinished,
	setMatchHasCancel,
	deleteMatch,
};
