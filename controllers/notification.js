const { socketIO } = require('../utils/socket')
const { redis } = require('../utils/redis')

const redisInstance = redis.getInstance()

exports.postNotification = async (req, res, next) => {
  try {
    const currentData = JSON.parse(await redisInstance.get(req.params.id)) || []
    currentData.push(req.body)
    
    const response = await redisInstance.set(req.params.id, JSON.stringify(currentData))
  
    socketIO.getInstance().emit('posts', { action: 'create', notification: req.body })
    res.status(200).json({
      status: response,
      message: 'Post Notification Successfully.',
    });
  } catch(error) {
    next(error);
  }
};

exports.getNotification = async (req, res, next) => {
  try {
    const redisInstance = redis.getInstance()
    const response = JSON.parse(await redisInstance.get(req.params.id)) || []
  
    res.status(200).json({
      status: 'OK',
      message: 'Get Notification Successfully.',
      data: response,
    });
  } catch(error) {
    next(error);
  }
};