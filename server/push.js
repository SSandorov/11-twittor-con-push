// añadimos la encriptación
const urlSafeBase64 = require('urlsafe-base64');

// añadimos el módulo push que empleamos para pasar la llave pública al servicio GET
const vapid = require('./vapid.json');

const suscripciones = [];

module.exports.getKey = () => {
    return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
    suscripciones.push(suscripcion);

    console.log(suscripciones);
};