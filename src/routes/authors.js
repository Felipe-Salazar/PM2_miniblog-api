import express from 'express';
const router = express.Router();
import { listAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../services/authorsService.js';

// Obtener Autores GET
router.get('/', async function(req, res) {
    try {
        const authors = await listAuthors();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
});

// Obtener Autor por ID GET
router.get('/:id', async function(req, res) {
    try {
        const author = await getAuthorById(req.params.id);

        if (!author) {
            return res.status(404).json({ error: 'Autor no parece existir'});
        }

        res.json(author);
     } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener ese autor'});
     }
})

// Crear Autor POST
// 
router.post('/', async function(req, res) {
    try {
        const { name, email, bio } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'No agregaste nombre, es obligatorio'});
        }

        if (!email || email.trim() === '') {
            return res.status(400).json({ error: 'No agregaste email, es obligatorio'});
        }

        const nuevoAutor = await createAuthor(name, email, bio);
        res.status(201).json(nuevoAutor);

    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Este email ya está siendo usado'});
        }
        res.status(500).json({ error: 'Error al crear un nuevo autor'});
    }
});


// Actualizar Autor PUT
router.put('/:id', async function(req, res) {
    try {
        const { name, email, bio } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'No agregaste nombre, es obligatorio para actualizar' });
        }

        if (!email || email.trim() === '') {
            return res.status(400).json({ error: 'No agregaste eamil, es obligatorio para actualizar' });
        }

        const autorAutualizado = await updateAuthor(req.params.id, name, email, bio);

        if(!autorAutualizado) {
            return res.status(404).json({ error: 'Fallo al localizar ese autor'})
        }

        res.json(autorAutualizado);

   } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Este email ya está siendo usado' });
        }
        res.status(500).json({ error: 'Error al actualizar el autor' });        
   }
})

// Eliminar author
router.delete('/:id', async function (req, res) {
    try {
        const autorEliminado = await deleteAuthor(req.params.id);

        if (!autorEliminado) {
            return res.status(404).json({ error: 'Fallo al obtener ese autor' });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el autor' });
    }
})

export default router;