import OAuth2 from '@fastify/oauth2';


export function init_app_OAuth2(app: fastify) {

	// Google
	app.register(OAuth2, {
		name: 'googleOAuth2',
		// Liste de ce qu'on demande comme autorisation
		scope: ['profile email'],

		credentials: {
			client: {
				id: process.env.GOOGLE_OAUTH_CLIENT_ID,
				secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
			},

			// plugin-provided configurations for Google OAuth
			auth: OAuth2.GOOGLE_CONFIGURATION,
		},
		// Cree directement une route de redirection en (get)
		startRedirectPath: '/login/google',
		// Envoi apres autorisation le token a l'adresse suivante
		// METTRE LE PORT DU .ENV !!!!!!!!
		callbackUri: 'http://localhost:3000/google/callback'
	});

	///////////////////////////////////// metttttttttttttttreee valeur de envvvvv
	// GitHub 
	app.register(OAuth2, {
		name: 'githubOAuth2',
		scope: ['user:email'],
		credentials: {
			client: {
				id: '<GITHUB_CLIENT_ID>',
				secret: '<GITHUB_CLIENT_SECRET>'
			},
			auth: OAuth2.GITHUB_CONFIGURATION
		},
		startRedirectPath: '/login/github',
		callbackUri: 'http://localhost:3000/github/callback'
	});

	// École 42 
	app.register(OAuth2, {
		name: 'ecole42OAuth2',
		scope: ['public'], // adapter aux scopes de l'école 42
		credentials: {
			client: {
				id: '<ECOLE42_CLIENT_ID>',
				secret: '<ECOLE42_CLIENT_SECRET>'
			},
			auth: {
				authorizeHost: 'https://api.intra.42.fr',
				authorizePath: '/oauth/authorize',
				tokenHost: 'https://api.intra.42.fr',
				tokenPath: '/oauth/token'
			}
		},
		startRedirectPath: '/login/ecole42',
		callbackUri: 'http://localhost:3000/ecole42/callback'
	});
}
