const express = require ('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require ('../middleware/authMiddleware');

router.get ('/',authMiddleware, cartController.cart_get);

router.get ('/add/:id',authMiddleware,cartController.product_add_get);
router.get ('/delete/:id',authMiddleware,cartController.product_delete_get);
router.get ('/clear',authMiddleware,cartController.clear_get);
router.get ('/update/:id',authMiddleware,cartController.update_get);

module.exports = router;