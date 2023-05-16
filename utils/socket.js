let instance = undefined;

const createSingleton = () => {
  return {
    getInstance: (server) => instance || (instance = require('socket.io')(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: false
      }
    }))
  };
};

module.exports = {
  socketIO: createSingleton()
}