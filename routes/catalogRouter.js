const express = require ('express');
const router = express.Router(); 
const catalogController = require('../controllers/catalogController');

router.get ('/', catalogController.index_get)
router.get ('/:page', catalogController.page_get)

router.get ('/products/:category', catalogController.products_get)

module.exports = router;