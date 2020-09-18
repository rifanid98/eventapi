const express = require('express');
const router = express.Router();

/** Load All Routes */
const eventsRouter = require('./r_events');

/** Fire the router */
router.use('/events', eventsRouter);

module.exports = router;