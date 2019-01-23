module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('new-post', (data) => {
      io.emit('new-post', data);
    });
  });
};