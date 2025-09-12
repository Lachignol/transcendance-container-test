import path from 'path';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyPrisma from '@joggr/fastify-prisma';
import { fileURLToPath } from 'url';
import { PrismaClient } from "@prisma/client";
import AutoLoad from '@fastify/autoload'
import formbody from '@fastify/formbody'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import type { FastifyRequest, FastifyReply } from 'fastify';



export function init_cors(app: fastify) {
	app.register(cors, {
		// put your options here
	})

}

export function init_reading_body_request(app: fastify) {
	// Pour lire les formulaire
	app.register(formbody);

}
export function init_app_database(app: fastify): void {
	// On cree notre client prisma
	const prisma = new PrismaClient();

	// Permet d'avoir prisma partout en typescript
	app.register(fastifyPrisma, {
		client: prisma,
	});

}



export function init_app_authentification(app: fastify): void {

	// Recuperaion des variables de l'env
	const { JWTSECRET } = process.env;

	// Pour ajouter la phrase secret au jwt
	app.register(jwt, {
		secret: JWTSECRET
	})
	//  pré-handler fonction puissante et flexible qui vous permet d'exécuter la logique avant qu'un gestionnaire de route ne soit appelé
	app.addHook('preHandler', (req, res, next) => {
		// ajoute la propriété jwt à l'objet de la requête (req), en lui attribuant la valeur stockée dans app.jwt. Cela permet d'attacher le jeton JWT (JSON Web Token) à la requête pour qu'il soit accessible et utilisé dans le traitement ultérieur.
		req.jwt = app.jwt
		return next()
	})
	// on ajoute l'option hook pour dire que le plugin doit recuperer les cookie a quel stade ici dans le prehandler donc avant le prise en compte de la route reel.
	app.register(fCookie, {
		//s ert à signer les cookies pour assurer leur intégrité et sécurité. Cela signifie que les cookies signés seront vérifiés avec cette clé secrète pour éviter les falsifications.
		secret: 'some-secret-key',
		hook: 'preHandler',
	})

	// creation du middleware pour l'authentification
	app.decorate(
		'authenticate',
		async (req: FastifyRequest, reply: FastifyReply) => {
			const token = req.cookies.access_token

			if (!token) {
				return reply.status(401).send({ message: 'Authentication required' })
			}
			// here decoded will be a different type by default but we want it to be of user-payload type
			const decoded = req.jwt.verify<FastifyJWT['user']>(token)
			req.user = decoded
		},
	)

}

export function init_app_public_repository(app: fastify, __dirname: string) {

	// Definition de repertoire static
	app.register(fastifyStatic, {
		root: path.join(__dirname, 'public'), // chemin absolu vers dossier public
		prefix: '/', // Les fichiers sont accessibles à la racine (ex: /index.html)
	});

}



export function init_app_routes(app: fastify, __dirname: string) {
	// Permet d'ajouter automatiquement les routes qui sont presentes dans le repertoire routes
	app.register(AutoLoad, {
		dir: path.join(__dirname, 'routes')
	})
}



export function run_app(app: fastify) {

	// Recuperaion des variables de l'env
	const { ADDRESS = 'localhost', PORT = '3000' } = process.env;
	// met le serveur en ecoute 
	app.listen({ port: parseInt(PORT, 10), host: ADDRESS }, function(err, address) {
		if (err) {
			app.log.error(err)
			process.exit(1)
		}
		console.log(`Server is now listening on ${address}`)
	})
}

