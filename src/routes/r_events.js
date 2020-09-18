const express = require('express');
const router = express.Router();

const upload = require('../helpers/upload');

/** Controllers */
const eventsController = require('../controllers/c_events');

/** Main CRUD */
router.get('/', eventsController.getEvents);
router.post('/', upload.single('image'), eventsController.postEvent);

module.exports = router;