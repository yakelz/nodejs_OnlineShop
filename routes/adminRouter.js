const express = require ('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const categoriesController = require('../controllers/categoriesController');
const {check} = require("express-validator");
const authMiddleware = require ('../middleware/authMiddleware');
const roleMiddleware = require ('../middleware/roleMiddleware');


router.get('/categories', authMiddleware, roleMiddleware('ADMIN'), categoriesController.categories_get);

router.post('/categories/create', [
    check('title', "Имя категории не может быть пустым").notEmpty(),
],categoriesController.create_post);

router.get('/categories/edit/:id', authMiddleware, roleMiddleware('ADMIN'),categoriesController.edit_get);
router.post('/categories/edit/:id', categoriesController.edit_post);

router.get('/categories/delete/:id',authMiddleware, roleMiddleware('ADMIN'), categoriesController.delete_get);


router.get('/products',authMiddleware, roleMiddleware('ADMIN'), productsController.products_get);

router.post('/products/create',[
    check('title', "Имя продукта не может быть пустым").notEmpty(),
    check('description', "Описание не может быть пустым").notEmpty(),
    check('price', "Неправильно введена цена").notEmpty().isFloat({ min:0})
],productsController.create_post);

router.get('/products/edit/:id',authMiddleware, roleMiddleware('ADMIN'),productsController.edit_get);
router.post('/products/edit/:id',[
    check('title', "Имя продукта не может быть пустым").notEmpty(),
    check('description', "Описание не может быть пустым").notEmpty(),
    check('price', "Неправильно введена цена").notEmpty().isFloat({ min:0})
],productsController.edit_post);

router.get('/products/delete/:id',authMiddleware, roleMiddleware('ADMIN'), productsController.delete_get);

module.exports = router;