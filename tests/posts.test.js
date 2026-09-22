import request from 'supertest';
import { createServer } from 'http';
import app from '../src/app.js';

let server;

beforeAll(function() {
    server = createServer(app).listen(0);
});

afterAll(function() {
    server.close();
});

describe('GET /posts', function() {
    it('debería responder 200 con un array', async function() {
        const respuesta = await request(server).get('/posts');

        expect(respuesta.status).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });
});

describe('POST /posts', function() {
    it('debería responder 400 si el author_id no existe', async function() {
        const respuesta = await request(server)
            .post('/posts')
            .send({ author_id: 999999, title: 'Título', content: 'Contenido' });

        expect(respuesta.status).toBe(400);
    });

    it('debería responder 400 si falta el título', async function() {
        const respuesta = await request(server)
            .post('/posts')
            .send({ author_id: 1, content: 'Contenido sin título' });

        expect(respuesta.status).toBe(400);
    });
});