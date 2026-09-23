import pool from '../db/pool.js';

async function listComments() {
    const resultado = await pool.query('SELECT * FROM comments ORDER BY id');
    return resultado.rows;
}

async function getCommentsByPost(postId) {
    const resultado = await pool.query(
        `SELECT comments.*, authors.name AS author_name
         FROM comments
         JOIN authors ON comments.author_id = authors.id
         WHERE comments.post_id = $1
         ORDER BY comments.created_at`,
        [postId]
    );
    return resultado.rows;
}

async function createComment(postId, authorId, content) {
    const resultado = await pool.query(
        'INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3) RETURNING *',
        [postId, authorId, content]
    );
    return resultado.rows[0];
}

async function updateComment(id, content) {
    const resultado = await pool.query(
        'UPDATE comments SET content = $1 WHERE id = $2 RETURNING *',
        [content, id]
    );
    return resultado.rows[0];
}

async function deleteComment(id) {
    const resultado = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
}

export { listComments, getCommentsByPost, createComment, updateComment, deleteComment };