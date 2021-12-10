const express = require ('express');
const router = express.Router(); 
const userController = require('../controllers/userController');
const {check} = require("express-validator");
const authMiddleware = require ('../middleware/authMiddleware');
const roleMiddleware = require ('../middleware/roleMiddleware');

// router.get ('/register', userController.register_get);
router.post ('/register',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('email', "Неправильно введен адрес электронной почты").isEmail(),
    check('password', "Длина пароля минимум 6 символов").isLength({min:6})
], userController.registration);

// router.get ('/login', userController.login_get);
router.post ('/login', userController.login);
// router.get ('/logout', userController.logout_get);
// router.post ('/logout', userController.logout_post);

router.get('/users', authMiddleware, roleMiddleware('ADMIN'), userController.getUsers)
module.exports = router;