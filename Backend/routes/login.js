const router = require('express').Router()
const db = require('../db.js');

//Obtener login de usuario
router.post('/', function(req, res) {

    const tipoUsuario = req.body.tipoUsuario;
    const user = req.body.usuario;
    const password = req.body.password;

    const sql = tipoUsuario === 'electricista' 
                ? "SELECT id, nombre FROM electricistas WHERE email = ? AND password = ?"
                : "SELECT id, nombre FROM usuarios WHERE email = ? AND password = ?";

    const params = [user, password];
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.json(results);
    });
    

})

module.exports = router