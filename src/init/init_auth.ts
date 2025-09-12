import jwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import type { FastifyRequest, FastifyReply } from 'fastify';


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
