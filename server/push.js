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

let suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
    suscripciones.push(suscripcion);

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones));
};

module.exports.sendPush = (post) => {

    console.log('Mandando Pushes');

    let notificacionesEnviadas = [];

    suscripciones.forEach( (suscripcion, i) => {

        const pushProm = webpush.sendNotification(suscripcion, JSON.stringify(post))
        .then(console.log('Notificación enviada'))
        .catch(err => {

            console.log('Notificación falló');
            if (err.statusCode === 410) { // ya no existe
                suscripciones[i].borrar = true;
            }
        });
    
        notificacionesEnviadas.push(pushProm);

    } );

    Promise.all( notificacionesEnviadas )
    .then( () => {
        suscripciones = suscripciones.filter(subs => !subs.borrar);

        fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones));
    } )
};