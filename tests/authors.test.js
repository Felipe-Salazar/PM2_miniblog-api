// import request from 'supertest';
// import app from '../src/app.js';

// describe('GET /authors', function() {
//     it('debería responder 200 con un array', async function() {
//         const respuesta = await request(app).get('/authors');

//         expect(respuesta.status).toBe(200);
//         expect(Array.isArray(respuesta.body)).toBe(true);
//     });
// });

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

describe('GET /authors', function() {
    it('debería responder 200 con un array', async function() {
        const respuesta = await request(server).get('/authors');

        expect(respuesta.status).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });
});

describe('GET /authors/:id', function() {
    it('debería responder 404 si el autor no existe', async function() {
        const respuesta = await request(server).get('/authors/999999');

        expect(respuesta.status).toBe(404);
    });
});

describe('POST /authors', function() {
    it('debería crear un autor válido y responder 201', async function() {
        const nuevoEmail = 'test' + Date.now() + '@mail.com';

        const respuesta = await request(server)
            .post('/authors')
            .send({ name: 'Autor de Prueba', email: nuevoEmail, bio: 'Bio de prueba' });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body.name).toBe('Autor de Prueba');
        expect(respuesta.body.id).toBeDefined();
    });

    it('debería responder 400 si falta el nombre', async function() {
        const respuesta = await request(server)
            .post('/authors')
            .send({ email: 'sinnombre@mail.com' });

        expect(respuesta.status).toBe(400);
    });

    it('debería responder 400 si el email ya existe', async function() {
        const emailRepetido = 'duplicado' + Date.now() + '@mail.com';

        await request(server).post('/authors').send({ name: 'Uno', email: emailRepetido });
        const respuesta = await request(server).post('/authors').send({ name: 'Dos', email: emailRepetido });

        expect(respuesta.status).toBe(400);
    });
});