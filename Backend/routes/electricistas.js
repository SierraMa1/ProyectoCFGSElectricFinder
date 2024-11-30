const router = require('express').Router()
const db = require('../db.js');

//Obtner lista de electricistas con media de puntuación
router.get('/', (req, res) => {

    const sql = 'SELECT e.*, AVG(v.puntuacion) as promedio_puntuacion FROM electricistas e LEFT JOIN valoraciones v ON e.id = v.id_electricista GROUP BY e.id';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener electricistas:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
});

//Obtener electricista por id
router.get('/:id', function(req, res) {

    var electricista = {};
    var valoraciones = {};
    const sql = "SELECT e.*, AVG(v.puntuacion) as promedio_puntuacion FROM electricistas e LEFT JOIN valoraciones v ON v.id_electricista = e.id WHERE e.id = ?";
    db.query(sql, req.params.id, (err, results) => {
        if (err) {
            console.error('Error al obtener electricistas:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        electricista = results[0];

        const sql2 = "SELECT v.comentario, v.puntuacion, u.nombre, u.ubicacion, u.id FROM valoraciones v INNER JOIN electricistas e ON e.id = v.id_electricista INNER JOIN usuarios u ON v.id_usuario = u.id WHERE e.id = ?";
        db.query(sql2, req.params.id, (err2, results2) => {
            if (err2) {
                console.error('Error al obtener electricistas:', err2);
                res.status(500).send('Error en el servidor');
                return;
            }
            valoraciones = results2;
            const data = {
                data: electricista,
                valoraciones: valoraciones
            };
            res.json(data);
        });

        
    });
    

})

// Añadir electricista
router.post('/', function(req, res) {

    const params = 
    [ 
        req.body.nombre, 
        req.body.apellidos, 
        req.body.telefono, 
        req.body.email, 
        req.body.ubicacion, 
        req.body.servicios,
        req.body.nombreEmpresa,
        req.body.password
    ];

    const sql = 'INSERT INTO electricistas (nombre, apellidos, telefono, email, ubicacion, servicios, nombreEmpresa, password) VALUES (?,?,?,?,?,?,?,?)';

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error al obtener electricistas:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        console.log(results)
        res.json(results);
    });
})

//Actualizar electricista
router.put('/:id', function(req, res) {
    const sql = 'UPDATE electricistas SET nombre = ?, apellidos = ?, telefono = ?, email = ?, ubicacion = ?, servicios = ?, nombreEmpresa = ? WHERE id = ?';
    const params = [ 
        req.body.nombre, 
        req.body.apellidos, 
        req.body.telefono, 
        req.body.email, 
        req.body.ubicacion, 
        req.body.servicios,
        req.body.nombreEmpresa,
        req.params.id
    ];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error al actualizar:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        console.log(results)
        res.json(results);
    });
})

//Borrar electricista
router.delete('/:id', function(req, res) {
    const sql = 'DELETE FROM electricistas WHERE id = ?';
    const id = req.params.id;

    db.query(sql, id, (err, results) => {
        if (err) {
            console.error('Error al obtener electricistas:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        
        res.json(results);
    });
})

module.exports = router