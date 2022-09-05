// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push.js');

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
  // añadimos la llave pública generada con la librería web-push y guardada en vapid.json
  const key = push.getKey();
  // no lo devolvemos como un json, sino como un Uint8array. Como ya aplicamos la lógica
  // para convertirlo de .json a Uint8array simplemente mandamos nuestra llave
  res.send(key);
});

// Ruta para enviar una notificación PUSH  a los usuarios suscritos que nosotros queramos
// Es una funcionalidad que no se controla con un servicio REST, sino que se hace desde
// el lado del servidor por seguridad, pero por fines educativos lo hacemos de esta manera
router.post('/push', (req, res) => {
  res.json('Notificación push');
});

module.exports = router;