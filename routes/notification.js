const express = require('express');

const notificationController = require('../controllers/notification');

const router = express.Router();

// GET /notification
router.get('/:id', notificationController.getNotification);

// POST /notification
router.post('/:id', notificationController.postNotification);

module.exports = router;