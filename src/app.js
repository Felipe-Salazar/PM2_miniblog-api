import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import authorsRouter from './routes/authors.js';
import postsRouter from './routes/posts.js';

const swaggerDocument = YAML.load('./openapi.yaml');

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/authors', authorsRouter);

app.use('/posts', postsRouter);

app.get('/', function(req, res) {
    res.json({ mensaje: 'API MiniBlog funcionando' });
});

export default app;