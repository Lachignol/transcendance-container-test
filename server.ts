import path from 'path';
import fastify from 'fastify';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { PrismaClient } from "@prisma/client";
import AutoLoad from '@fastify/autoload'


// On obtient le chemin complet du fichier courant
const __filename = fileURLToPath(import.meta.url);

// On obtient le dossier du fichier courant
const __dirname = path.dirname(__filename);

// On apelle notre instance app et on active le logger
const app = fastify({ logger: true })

// On cree notre client prisma
const prisma = new PrismaClient();


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

app.register(AutoLoad, {
  dir: path.join(__dirname, 'src/routes')
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
app.listen({ port: 3000 , host: '0.0.0.0' }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

export default app ;

