INSERT INTO authors (name, email, bio) VALUES
('Andres Lopez', 'andy.lopez@gmail.com', 'Comediante de stand-up.'),
('Luis Ramos', 'lrama@gmail.com', 'Tatauador estilo japonés.'),
('Maria Campos', 'camposdemaria@mail.com', 'Influencer de viajes y cultura.');

INSERT INTO posts (author_id, title, content, published) VALUES
(1, 'Show de comedia en Downtown', 'Quiero invitar a todos a ver mi show de comedia en Downtown este fin de semana.', true),
(2, 'Flash tatues', 'Este miércoles tengo un evento especial de tatues flash.', true),
(3, 'Bienvenidos a Noruega', 'Esta semana subire post sobre toda mi experiencia en este país', false),
(3, 'Japón, un lugar indescriptible', 'Recorrer Tokio fue una experiencia increíble...', true);

INSERT INTO comments (post_id, author_id, content) VALUES
(1, 3, '¡Increible! Me encantaría asistir a tu show, tienes voletas?'),
(1, 1, 'Sí, aún tengo algunas disponibles.'),
(2, 1, 'Tengo una idea para un tatuaje, ¿puedo reservar un espacio?'),
(2, 2, 'Claro, envíame un mensaje privado para coordinarlo.'),
(3, 2, 'Qué envidia, algún día espero visitar Japón también.'),
(3, 3, 'Es un lugar hermoso, tengo vuelos baratos para la próxima semana, si quieres te paso el dato.');