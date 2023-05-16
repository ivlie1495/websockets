const Redis = require('ioredis')

let instance = undefined;
const createRedis = () => new Redis({
  host: '128.199.135.74',
  port: '63791',
  db: 3,
});

const createSingleton = (createInstance) => {
  return {
    getInstance: () => instance || (instance = createInstance())
  };
}

module.exports = {
  redis: createSingleton(createRedis)
}
