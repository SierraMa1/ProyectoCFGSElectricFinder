const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }))

// Para que funcione en local CORS

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

//fin CORS

const PORT = process.env.PORT || 3400;

const router = require('./routes')
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

