const router = require('express').Router()
const db = require('../db.js');

//Obtener lista de valoraciones
router.get('/', function(req, res) {

    var usuario = {};
    var valoraciones = {};
    const sql = "SELECT v.puntuacion, v.comentario, v.fecha, e.id, e.nombre, e.apellidos, e.ubicacion, e.servicios, u.nombre as usuario, u.ubicacion as ubicacion_usuario, u.tieneFoto, u.typeFoto, u.id as usuario_id FROM valoraciones v INNER JOIN usuarios u ON u.id = v.id_usuario INNER JOIN electricistas e ON e.id = v.id_electricista";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
        
    });
})


// Añadir valoracion
router.post('/', function(req,res) {
    console.log(req.body);
    const params = [ 
        req.body.electricista_id, 
        req.body.id_usuario, 
        req.body.puntuacion, 
        req.body.comentario,
        req.body.fecha
    ];

    const sql = "INSERT INTO valoraciones (id_electricista, id_usuario, puntuacion, comentario, fecha) VALUES (?,?,?,?,?)";

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error al añadir valoración:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        console.log(results)
        res.json(results);
    });

})

module.exports = router