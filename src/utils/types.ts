import { JWT } from '@fastify/jwt'
import { OAuth2Namespace } from '@fastify/oauth2';

// adding jwt property to req
// authenticate property to FastifyInstance
declare module 'fastify' {
	interface FastifyRequest {
		jwt: JWT
	}
	export interface FastifyInstance {
		authenticate: any
	}

	interface FastifyInstance {
		GOOGLE_CONFIGURATION: OAuth2Namespace;
		myCustomOAuth2: OAuth2Namespace;
	}
}


type UserPayload = {
	id: string
	email: string
	name: string
}



declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: UserPayload
	}
}


