import express from 'express';
import authorsRouter from './routes/authors.js';
import postsRouter from './routes/posts.js';

const app = express();

app.use(express.json());

app.use('/authors', authorsRouter);

app.use('/posts', postsRouter);

app.get('/', function(req, res) {
    res.json({ mensaje: 'API MiniBlog funcionando' });
});

export default app;