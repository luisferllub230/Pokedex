const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get("/", usersController.GetHome);
router.post("/", usersController.PostHome);

module.exports = router;