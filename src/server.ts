import path from 'path';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyPrisma from '@joggr/fastify-prisma';
import { fileURLToPath } from 'url';
import { PrismaClient } from "@prisma/client";
import AutoLoad from '@fastify/autoload'
import formbody from '@fastify/formbody'
import cors from '@fastify/cors'


// Recuperaion des variables de l'env
const { ADDRESS = 'localhost', PORT = '3000' } = process.env;
// On obtient le chemin complet du fichier courant
const __filename = fileURLToPath(import.meta.url);

// On obtient le dossier du fichier courant
const __dirname = path.dirname(__filename);

// On apelle notre instance app et on active le logger
const app = fastify({ logger: true })


await app.register(cors, {
	// put your options here
})
// On cree notre client prisma
const prisma = new PrismaClient();

// Permet d'avoir prisma partout en typescript
app.register(fastifyPrisma, {
	client: prisma,
});

// Pour lire les formulaire
app.register(formbody);


// Definition de repertoire static
app.register(fastifyStatic, {
	root: path.join(__dirname, 'public'), // chemin absolu vers dossier public
	prefix: '/', // Les fichiers sont accessibles à la racine (ex: /index.html)
});

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


// met le serveur en ecoute 
app.listen({ port: parseInt(PORT, 10), host: ADDRESS }, function(err, address) {
	if (err) {
		app.log.error(err)
		process.exit(1)
	}
	console.log(`Server is now listening on ${address}`)
})

export default app;

