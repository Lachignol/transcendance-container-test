import path from 'path';
import type { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import AutoLoad from '@fastify/autoload'
import { promises as fs } from 'fs';


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

export function init_app_upload_dir(uploadsDir: string) {
	fs.mkdir(uploadsDir, { recursive: true });
}
