import fastify from 'fastify';
import fastifyPrisma from '@joggr/fastify-prisma';
import { PrismaClient } from "@prisma/client";


export function init_app_database(app: fastify): void {
	// On cree notre client prisma
	const prisma = new PrismaClient();

	// Permet d'avoir prisma partout en typescript
	app.register(fastifyPrisma, {
		client: prisma,
	});

}



