const express = require ('express');
const router = express.Router(); 
const catalogController = require('../controllers/catalogController');

router.get ('/', catalogController.index_get)
router.get ('/:page', catalogController.page_get)


router.get ('/item/create', catalogController.item_create_get)
router.post ('/item/create', catalogController.item_create_post)

router.get ('/item/edit', catalogController.item_edit_get)
router.post ('/item/edit', catalogController.item_edit_post)

router.post ('/item/delete', catalogController.item_delete_post)

router.get ('/item/:id', catalogController.item_id_get)

module.exports = router;