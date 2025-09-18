import path from 'path';
import fastify from 'fastify';
import { fileURLToPath } from 'url';
import { init_cors, init_reading_body_request, init_reading_multipartFormData } from './init/init_utils.ts'
import { init_app_database } from './init/init_database.ts'
import { init_app_public_repository, init_app_routes, init_app_upload_dir } from './init/init_repositories.ts'
import { init_app_authentification } from './init/init_auth.ts'
import { init_app_OAuth2 } from './init/init_OAuth.ts'
import { run_app } from './init/run_server.ts'

// On obtient le chemin complet du fichier courant
const __filename = fileURLToPath(import.meta.url);

// On obtient le dossier du fichier courant
const __dirname = path.dirname(__filename);


//creation du path pour cree le repertoire uploads si il existe pas
export const uploadsDir = path.join(__dirname + '/public', 'uploads');
// On apelle notre instance app et on active le logger
const app = fastify({ logger: true })


init_app_database(app);
init_reading_body_request(app);
init_reading_multipartFormData(app);
init_cors(app);
init_app_public_repository(app, __dirname);
init_app_routes(app, __dirname);
init_app_upload_dir(uploadsDir);
init_app_authentification(app);
init_app_OAuth2(app);
run_app(app);


export default app;
