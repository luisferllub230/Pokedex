const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/pokemonsM", adminController.GetPokemonsM);
router.get("/regionsM", adminController.GetRegionsM);
router.get("/typesM", adminController.GetTypesM);
router.post("/typesM", adminController.PostTypesM);

router.get("/edit/:active/:id", adminController.GetEdit);
router.post("/edit/:active", adminController.PostEdit); //parameters bug

router.get("/delete/:active/:id", adminController.GetDelete);
router.post("/delete/:active", adminController.PostDelete); //parameters bug

module.exports = router;