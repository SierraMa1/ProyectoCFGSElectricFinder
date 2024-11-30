const router = require('express').Router()
const db = require('../db.js');

//Obtener usuario por id
router.get('/:id', function(req, res) {

    var usuario = {};
    var valoraciones = {};
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        usuario = results[0];

        const sql2 = "SELECT v.comentario, v.puntuacion, e.nombre, e.apellidos, e.id FROM valoraciones v INNER JOIN electricistas e ON e.id = v.id_electricista INNER JOIN usuarios u ON v.id_usuario = u.id WHERE u.id = ?";

        db.query(sql2, req.params.id, (err2, results2) => {
            if (err2) {
                console.error('Error al obtener usuario:', err2);
                res.status(500).send('Error en el servidor');
                return;
            }
            valoraciones = results2;
            const data = {
                data: usuario,
                valoraciones: valoraciones
            };
            res.json(data);
        });

        
    });
    

})

// Añadir usuario
router.post('/', function(req, res) {

    const sql = 'INSERT INTO usuarios (nombre, apellidos, email, ubicacion, password) VALUES (?,?,?,?,?)';

    const params = [ 
        req.body.nombre, 
        req.body.apellidos, 
        req.body.email, 
        req.body.ubicacion,
        req.body.password
    ];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error al añadir electricista:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        console.log(results)
        res.json(results);
    });
})

//Actualizar usuario
router.put('/:id', function(req, res) {
    const sql = 'UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, ubicacion = ? WHERE id = ?';
    const params = [ 
        req.body.nombre, 
        req.body.apellidos, 
        req.body.email, 
        req.body.ubicacion, 
        req.params.id
    ];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error al actualizar:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
})

//Borrar usuario
router.delete('/:id', function(req, res) {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    const id = req.params.id;

    db.query(sql, id, (err, results) => {
        if (err) {
            console.error('Error al borrar usuario:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
})

module.exports = router