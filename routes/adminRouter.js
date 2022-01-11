const express = require ('express');
const router = express.Router();
const path = require("express");
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const {check} = require("express-validator");
const authMiddleware = require ('../middleware/authMiddleware');
const roleMiddleware = require ('../middleware/roleMiddleware');


router.get('/categories', authMiddleware, roleMiddleware('ADMIN'), categoriesController.categories_get);

router.post('/categories/create', categoriesController.create_post);

router.get('/categories/edit/:id');
router.post('/categories/edit/:id');

router.get('/categories/delete/:id');


router.get('/products',authMiddleware, roleMiddleware('ADMIN'), productsController.products_get);

router.post('/products/create',[
    check('title', "Имя продукта не может быть пустым").notEmpty(),
    check('description', "Описание не может быть пустым").notEmpty(),
    check('price', "Неправильно введена цена").isFloat()
],productsController.create_post);



router.get('/products/edit/:id');
router.post('/products/edit/:id');

router.get('/products/delete/:id');

module.exports = router;