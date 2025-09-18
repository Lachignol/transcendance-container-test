import type { JWT } from '@fastify/jwt'
import type { OAuth2Namespace } from '@fastify/oauth2';

// adding jwt property to req
// authenticate property to FastifyInstance
declare module 'fastify' {
	interface FastifyRequest {
		jwt: JWT
		filename: string
	}
	export interface FastifyInstance {
		authenticate: any
		upload: any
	}

	interface FastifyInstance {
		googleOAuth2: OAuth2Namespace;
		githubOAuth2: OAuth2Namespace;
		ecole42OAuth2: OAuth2Namespace;
	}
}


type UserPayload = {
	id: string
	email: string
	name: string
	OAuth: string
}



declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: UserPayload
	}
}


