const router = require('express').Router()

const electricistas = require('./electricistas')
const usuarios = require('./usuarios')
const valoraciones = require('./valoraciones')
const login = require('./login')
const uploadImage = require('./uploadImage')

router.use('/electricistas', electricistas)
router.use('/usuarios', usuarios)
router.use('/valoraciones', valoraciones)
router.use('/login', login)
router.use('/uploadImage', uploadImage)

router.get('/', function (req, res) {
  res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router