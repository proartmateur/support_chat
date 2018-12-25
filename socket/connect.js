const data = require('../services/data');

function connect(io, socket) {
    socket.on('agent/message', (payload) => {

        /*
         *console.log(`------- From: ${socket.id}`);
         *console.log('Message: ', payload);
         */
        /* Emite a todos un mensaje*/
        io.emit('agent/message', { 'id': socket.id,
          'message': payload.message,
          'usr': payload.usr });

        /*
         * Emite a todos un mensaje
         *excepto a quien emitió el mensaje al server
         */
        /*
         * socket.broadcast.emit('agent/message',{"id":'sys',
         * "message":"En un momento te atendemos...",
         * "usr":'sys'});
         */

        /* Responde el a quien emitió el mensaje */
        /*
         * socket.emit('agent/message',{"id":'soporte',
         * "message":"En un momento te atendemos...",
         *"usr":'sys'});
         */

        setTimeout(() => {
          socket.emit('agent/message', { 'id': 'soporte',
            'message': 'Ya estamos revisando tu ticket.',
            'usr': 'sys' });
        }, 5000);
      });

      socket.on('list_developers', (payload) => {
        data.list_developers();
        io.emit('agent/message', 'Se ha listado developers en un lado');
      });

      socket.on('find_developer', (payload) => {
        const resultado = data.find_developer(payload.uid);

        io.emit('agent/message', `Developer: ${resultado}`);
      });

}

module.exports = {
    connect
};
