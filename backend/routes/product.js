const express = require('express');

const productCtrl = require('../controllers/product');

const router = express.Router();

router.post('/', productCtrl.createProduct);
router.get('/', productCtrl.getAllProduct);
router.get('/:id', productCtrl.getOneProduct);
router.put('/:id', productCtrl.modifyProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;
