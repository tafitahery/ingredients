const express = require('express');

const ingredientCtrl = require('../controllers/ingredient');

const router = express.Router();

router.post('/', ingredientCtrl.createIngredient);
router.get('/', ingredientCtrl.getAllIngredients);
router.get('/:id', ingredientCtrl.getOneIngredient);
router.put('/:id', ingredientCtrl.modifyIngredient);
router.delete('/:id', ingredientCtrl.deleteIngredient);

module.exports = router;
