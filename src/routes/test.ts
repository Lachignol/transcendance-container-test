
import type { FastifyInstance } from 'fastify';

const route = async (app: FastifyInstance) => {


app.get('/test', async (request, reply) => {
return   reply.view('index', { title: 'Arthur mobutou' ,age: 'test'});
});


}


export default route;
