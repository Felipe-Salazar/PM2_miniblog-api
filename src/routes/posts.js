import express from 'express';
const router = express.Router();
import { listPosts, getPostById, createPost, updatePost, deletePost, getPostsByAuthor } from '../services/postsService.js';

// Mostar lista de Posts
router.get('/', async function(req, res) {
    try {
        const posts = await listPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
});

// Mostrar post con autor y ID del autor
router.get('/author/:authorId', async function(req, res) {
    try {
        const posts = await getPostsByAuthor(req.params.authorId);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los posts de este autor' });
    }
});

// Mostrar Post con ID del post
router.get('/:id', async function(req, res) {
    try {
        const post = await getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado con ese ID' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el post' });
    }
});

// Crear Post
router.post('/', async function(req, res) {
    try {
        const { author_id, title, content, published } = req.body;

        if (!author_id) {
            return res.status(400).json({ error: 'El ID del autor es obligatorio' });
        }
        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'No agregaste título, es obligatorio' });
        }
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'No agregaste contenido, es obligatorio' });
        }

        const nuevoPost = await createPost(author_id, title, content, published);
        res.status(201).json(nuevoPost);

    } catch (error) {
        if (error.code === '23503') {
            return res.status(400).json({ error: 'El ID ingresado no corresponde a ningún autor existente' });
        }
        res.status(500).json({ error: 'Error al crear el post' });
    }
});

// Actualizar Post
router.put('/:id', async function(req, res) {
    try {
        const { title, content, published } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'No agregaste título, es obligatorio' });
        }
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'No agregaste contenido, es obligatorio' });
        }

        const postActualizado = await updatePost(req.params.id, title, content, published);

        if (!postActualizado) {
            return res.status(404).json({ error: 'Fallo al localizar ese post' });
        }

        res.json(postActualizado);

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el post' });
    }
});

// Eliminar Post
router.delete('/:id', async function(req, res) {
    try {
        const postEliminado = await deletePost(req.params.id);

        if (!postEliminado) {
            return res.status(404).json({ error: 'Fallo al localizar ese post' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
});

export default router;