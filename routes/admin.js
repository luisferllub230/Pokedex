const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/pokemonsM", adminController.GetPokemonsM);
router.get("/regionsM", adminController.GetRegionsM);
router.get("/typesM", adminController.GetTypesM);

module.exports = router;