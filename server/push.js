// añadimos el módulo push que empleamos para pasar la llave pública al servicio GET
const vapid = require('./vapid.json');

module.exports.getKey = () => {
    return vapid.publicKey;
};