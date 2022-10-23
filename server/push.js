// almacenamos información de manera persistente de la siguiente manera
const fs = require('fs');

// añadimos la encriptación
const urlSafeBase64 = require('urlsafe-base64');

// añadimos el módulo push que empleamos para pasar la llave pública al servicio GET
const vapid = require('./vapid.json');

// añadimos la variable para manejar el web-push
const webpush = require('web-push');
// manejamos el webpush
webpush.setVapidDetails(
    'mailto:____@gmail.com',
    vapid.publicKey,
    vapid.privateKey
)

const suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
    suscripciones.push(suscripcion);

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones));
};

module.exports.sendPush = (post) => {
    suscripciones.forEach( (suscripcion, i) => {
        webpush.sendNotification(suscripcion, post.titulo).then().catch(console.log);
    } );
};