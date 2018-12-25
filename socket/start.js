/**
 *
 * De preferencia no se edita éste script
 * Preferably this script should not be edited
 *
 */

/**
 * Las funciones de connect se ejecutan cuando un usuario se conecta
 * Connect functions runs when an user is connected
 */
const { connect } = require('./connect');

/**
 * Las funciones de disconnect se ejecutan cuando un usuario se desconecta
 * Disconnect functions runs when an user is disconnected
 */
const { disconnect } = require('./disconnect');

/**
 * Las funciones de intervalEmit se ejecutan cada cierto tiempo (interval_time)
 * intervalEmit functions runs every certain time lapse (interval_time)
 */
const { interval_time, intervalEmmit } = require('./intervalEmit');


function startIo(io) {
    io.on('connect', (socket) => {

        /**
         * Muestra el socket id del usuario que se conecta en la consola
         */
        console.log(`------- IO Connected ${socket.id}`);

        connect(io, socket);

        socket.on('disconnect', function() {
          disconnect(io, socket);
        });

        setInterval(() => {
          intervalEmmit(io, socket);
        }, interval_time);
      });
}

module.exports = {
    startIo
};
