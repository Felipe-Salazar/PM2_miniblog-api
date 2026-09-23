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

describe('GET /comments', function() {
    it('debería responder 200 con un array', async function() {
        const respuesta = await request(server).get('/comments');

        expect(respuesta.status).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });
});

describe('POST /comments', function() {
    it('debería crear un comentario válido y responder 201', async function() {
        const respuesta = await request(server)
            .post('/comments')
            .send({ post_id: 1, author_id: 1, content: 'Comentario de test' });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body.content).toBe('Comentario de test');
    });

    it('debería responder 400 si el post_id no existe', async function() {
        const respuesta = await request(server)
            .post('/comments')
            .send({ post_id: 999999, author_id: 1, content: 'No debería crearse' });

        expect(respuesta.status).toBe(400);
    });

    it('debería responder 400 si falta el contenido', async function() {
        const respuesta = await request(server)
            .post('/comments')
            .send({ post_id: 1, author_id: 1 });

        expect(respuesta.status).toBe(400);
    });
});