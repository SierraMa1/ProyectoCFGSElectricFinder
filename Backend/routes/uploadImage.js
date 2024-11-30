const router = require('express').Router()
const db = require('../db.js');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Front/public/images/' + req.body.tipo + '/');
    },
    filename: function (req, file, cb) {
      cb(null, req.body.id + file.originalname.slice(-4));
    }
})
const upload = multer({storage: storage});

const fs = require('fs')
const path = require('path')

router.post('/', [upload.single('attachment')], (req, res, next) => {

    let tipo = req.body.tipo;
    let id = req.body.id;
    let type = req.file.originalname.slice(-3);
    let responseb = {};

    if (req.file.length == 0) {
        responseb.error = true;
        responseb.mensaje = 'Ingrese una imagen';
        responseb.codigo = 400;
        res.status(400).send(responseb);

    } else {
        if (req.file.mimetype.indexOf('image') >= 0) {
            let { fileName } = req.file.filename;
            const sql = tipo === 'electricista' 
                ? "UPDATE electricistas SET tieneFoto = 1, typeFoto = ?  WHERE id = ?"
                : "UPDATE usuarios SET tieneFoto = 1, typeFoto = ?  WHERE id = ?";

            const params = [type, id];

            db.query(sql, params, (err, results) => {
                if (err) {
                    console.error('Error al actualizar:', err);
                    res.status(500).send('Error en el servidor');
                    return;
                }
                console.log(results)
                res.json(results);
            });

        } else {
            responseb.error = true;
            responseb.mensaje = 'Ingrese una imagen';
            responseb.codigo = 400;
            res.status(400).send(responseb);
        }
    }
});

module.exports = router;