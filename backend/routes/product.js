const express = require('express');

const productCtrl = require('../controllers/product');

const router = express.Router();

router.post('/', productCtrl.createProduct);

module.exports = router;
