import pool from '../db/pool.js';

// Lista de posts
async function listPosts() {
    const resultado = await pool.query('SELECT * FROM posts ORDER BY id');
    return resultado.rows;
}

// Obtener post por ID
async function getPostById(id) {
    const resultado = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return resultado.rows[0];
}

// Obtener post por Author
async function getPostsByAuthor(authorId) {
    const resultado = await pool.query(
        `SELECT posts.*, authors.name AS author_name, authors.email AS author_email
        FROM posts
        JOIN authors ON posts.author_id = authors.id
        WHERE posts.author_id = $1
        ORDER BY posts.id`,
        [authorId]
    );
    return resultado.rows;
}

// Crear Post y retornarlo
async function createPost(authorId, title, content, published) {
    const resultado = await pool.query(
        'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *',
        [authorId, title, content, published || false]
    );
    return resultado.rows[0];
}

// Actualizar Post por ID
async function updatePost(id, title, content, published) {
    const resultado = await pool.query(
        'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
        [title, content, published, id]
    );
    return resultado.rows[0];
}

//Borrar post por ID
async function deletePost(id) {
    const resultado = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
}

export { listPosts, getPostById, getPostsByAuthor, createPost, updatePost, deletePost };