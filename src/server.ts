import path from 'path';
import fastify from 'fastify';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { PrismaClient } from "@prisma/client";
import AutoLoad from '@fastify/autoload'
import formbody from '@fastify/formbody'


// Recuperaion des variables de l'env
const { ADDRESS = 'localhost', PORT = '3000' } = process.env;
// On obtient le chemin complet du fichier courant
const __filename = fileURLToPath(import.meta.url);

// On obtient le dossier du fichier courant
const __dirname = path.dirname(__filename);

// On apelle notre instance app et on active le logger
const app = fastify({ logger: true })

// On cree notre client prisma
const prisma = new PrismaClient();

// Pour lire les formulaire
app.register(formbody);
// On enregistre pour notre moteur de template le repertoire ou chercher les fichiers
app.register(fastifyView, {
	engine: {
		ejs,
	},
	root: path.join(__dirname, 'views'),
	viewExt: 'ejs',
	// layout: 'layout.ejs', // facultatif, si vous avez un layout commun
});

// On ajoute a notre instance que l'on exporte par la suuite notre client prisma
app.decorate('prisma', prisma);

// Permet d'ajouter automatiquement les routes qui sont presentes dans le repertoire routes
app.register(AutoLoad, {
	dir: path.join(__dirname, 'routes')
})

// Permet d'ajouter un client a la mano pour les test
// async function addOneUser() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Mobutou',
//       email: 'Mobutou@prisma.io',
//     },
//   })
//   // console.log(user)
// }
//
// addOneUser()

// Run the server!
app.listen({ port: parseInt(PORT, 10), host: ADDRESS }, function(err, address) {
	if (err) {
		app.log.error(err)
		process.exit(1)
	}
	console.log(`Server is now listening on ${address}`)
})

export default app;

