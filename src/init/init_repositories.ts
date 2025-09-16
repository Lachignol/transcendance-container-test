import path from 'path';
import type { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import AutoLoad from '@fastify/autoload'



export function init_app_public_repository(app: FastifyInstance, __dirname: string) {

	// Definition de repertoire static
	app.register(fastifyStatic, {
		root: path.join(__dirname, 'public'), // chemin absolu vers dossier public
		prefix: '/', // Les fichiers sont accessibles à la racine (ex: /index.html)
	});

}



export function init_app_routes(app: FastifyInstance, __dirname: string) {
	// Permet d'ajouter automatiquement les routes qui sont presentes dans le repertoire routes
	app.register(AutoLoad, {
		dir: path.join(__dirname, 'routes')
	})
}
