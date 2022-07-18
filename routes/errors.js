const express = require('express');
const router = express.Router();
const errorsController = require('../controllers/errorsController');

router.use("/", errorsController.Get404);

module.exports = router;