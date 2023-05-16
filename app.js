const express = require('express');
const bodyParser = require('body-parser');

const { socketIO } = require('./utils/socket')
const { redis } = require('./utils/redis')

const notificationRoutes = require('./routes/notification');

const app = express();
app.use(bodyParser.json()); // application/json

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/notification', notificationRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ status, message, data });
});

const server = app.listen(8080);
const io = socketIO.getInstance(server);

// Init redis
redis.getInstance()

io.on('connection', (socket) => {
  console.log('client connected')
})
