//init_OAuth.ts
import type { FastifyInstance } from 'fastify'
import OAuth2 from '@fastify/oauth2';


export function init_app_OAuth2(app: FastifyInstance) {

	// Google
	app.register(OAuth2, {
		name: 'googleOAuth2',
		// Liste de ce qu'on demande comme autorisation
		scope: ['profile email'],

		credentials: {
			client: {
				id: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
				secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
			},

			// plugin-provided configurations for Google OAuth
			auth: OAuth2.GOOGLE_CONFIGURATION,
		},
		tokenRequestParams: {
			client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
			client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
		},
		// Cree directement une route de redirection en (get)
		startRedirectPath: '/login/google',
		// Envoi apres autorisation le token a l'adresse suivante
		// METTRE LE PORT DU .ENV !!!!!!!!
		callbackUri: 'http://localhost:3000/google/callback',
	});

	///////////////////////////////////// metttttttttttttttreee valeur de envvvvv
	// GitHub 
	app.register(OAuth2, {
		name: 'githubOAuth2',
		scope: ['user:email'],
		credentials: {
			client: {
				id: process.env.GITHUB_CLIENT_ID as string,
				secret: process.env.GITHUB_CLIENT_SECRET as string,
			},
			auth: OAuth2.GITHUB_CONFIGURATION
		},
		startRedirectPath: '/login/github',
		callbackUri: 'http://localhost:3000/github/callback',
	});

	// École 42 
	app.register(OAuth2, {
		name: 'ecole42OAuth2',
		scope: ['public'], // adapter aux scopes de l'école 42
		credentials: {
			client: {
				id: process.env.ECOLE42_CLIENT_ID as string,
				secret: process.env.ECOLE42_CLIENT_SECRET as string,
			},
			auth: {
				authorizeHost: 'https://api.intra.42.fr',
				authorizePath: '/oauth/authorize',
				tokenHost: 'https://api.intra.42.fr',
				tokenPath: '/oauth/token'
			}
		},
		startRedirectPath: '/login/ecole42',
		callbackUri: 'http://localhost:3000/ecole42/callback',
	});
}
