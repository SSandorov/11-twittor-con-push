// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();


const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

// Definimos nuevas rutas

// Ruta para almacenar la suscripción
router.post('/subscribe', (req, res) => {
  res.json('subscribe');
});

// Ruta para almacenar la llave pública del cliente
router.get('/key', (req, res) => {
  res.json('Key público');
});

// Ruta para enviar una notificación PUSH  a los usuarios suscritos que nosotros queramos
// Es una funcionalidad que no se controla con un servicio REST, sino que se hace desde
// el lado del servidor por seguridad, pero por fines educativos lo hacemos de esta manera
router.post('/push', (req, res) => {
  res.json('Notificación push');
});

module.exports = router;