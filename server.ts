import path from 'path';
import fastify from 'fastify';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { PrismaClient } from "@prisma/client";

// On obtient le chemin complet du fichier courant
const __filename = fileURLToPath(import.meta.url);

// On obtient le dossier du fichier courant
const __dirname = path.dirname(__filename);

export const app = fastify({ logger: true })

const prisma = new PrismaClient();

app.register(fastifyView, {
  engine: {
    ejs,
  },
  root: path.join(__dirname, 'views'),
  viewExt: 'ejs',
  // layout: 'layout.ejs', // facultatif, si vous avez un layout commun
});

app.get('/', (request, reply) => {
  reply.view('index', { title: 'Arthur' ,age: '1 ans comme mobutu'});
});

app.get('/profil', (request, reply) => {
  reply.view('index', { title: 'Casey' ,age: '15'});
});

app.get('/exemples', async () => {
  return await prisma.exemple.findMany();
});


// Run the server!
app.listen({ port: 3000 , host: '0.0.0.0' }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

