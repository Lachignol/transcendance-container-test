import type { FastifyInstance } from 'fastify';

export function run_app(app: FastifyInstance) {

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

