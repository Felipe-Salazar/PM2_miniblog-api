import express from 'express';
const router = express.Router();
import { listComments, getCommentsByPost, createComment, updateComment, deleteComment } from '../services/commentsService.js';

router.get('/', async function(req, res) {
    try {
        const comments = await listComments();
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
});

router.get('/post/:postId', async function(req, res) {
    try {
        const comments = await getCommentsByPost(req.params.postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios del post' });
    }
});

router.post('/', async function(req, res) {
    try {
        const { post_id, author_id, content } = req.body;

        if (!post_id) {
            return res.status(400).json({ error: 'El ID del post es obligatorio' });
        }
        if (!author_id) {
            return res.status(400).json({ error: 'El ID del autor es obligatorio' });
        }
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'No agregaste contenido, es obligatorio' });
        }

        const nuevoComentario = await createComment(post_id, author_id, content);
        res.status(201).json(nuevoComentario);

    } catch (error) {
        if (error.code === '23503') {
            return res.status(400).json({ error: 'El ID del post o del autor no corresponden a registros existentes' });
        }
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
});

router.put('/:id', async function(req, res) {
    try {
        const { content } = req.body;

        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'El contenido es obligatorio' });
        }

        const comentarioActualizado = await updateComment(req.params.id, content);

        if (!comentarioActualizado) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        res.json(comentarioActualizado);

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el comentario' });
    }
});

router.delete('/:id', async function(req, res) {
    try {
        const comentarioEliminado = await deleteComment(req.params.id);

        if (!comentarioEliminado) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
});

export default router;