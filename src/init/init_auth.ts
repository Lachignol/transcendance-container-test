//init_auth.ts

import jwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import type { FastifyRequest, FastifyReply } from 'fastify';

export function init_app_authentification(app: fastify): void {


	// on ajoute l'option hook pour dire que le plugin doit recuperer les cookie a quel stade ici dans le prehandler donc avant le prise en compte de la route reel.
	// sert à signer les cookies pour assurer leur intégrité et sécurité. Cela signifie que les cookies signés seront vérifiés avec cette clé secrète pour éviter les falsifications.
	app.register(fCookie, {
		secret: process.env.COOKIESECRET,  // même clé partout
		hook: 'preHandler',
		parseOptions: {
			httpOnly: true,
			secure: false, // false en dev local HTTP, true en prod HTTPS
			sameSite: 'lax',
			path: '/',
		},
	});

	// Pour ajouter la phrase secret au jwt
	app.register(jwt, {
		secret: process.env.JWTSECRET
	})
	//  pré-handler fonction qui permet d'exécuter quelquechose avant les routes ne soit appelé
	app.addHook('preHandler', (req, res, next) => {
		// ajoute la propriété jwt à l'objet de la requête (req), en lui attribuant la valeur stockée dans app.jwt. Cela permet d'attacher le jeton JWT (JSON Web Token) à la requête pour qu'il soit accessible et utilisé dans le traitement ultérieur.
		req.jwt = app.jwt
		return next()
	})
	// creation du middleware (un middleware c'est une fonction qui fait le relai entre la requete et notre controller en gros ')pour l'authentification
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
