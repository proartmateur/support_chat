const interval_time = 100000;

function intervalEmmit(io, socket) {

    socket.emit('agent/message', { id: '123asd12',
      message: 'chat bot message',
      usr: 'Enrique Nieto' });

}

module.exports = {
    intervalEmmit,
    interval_time
};
