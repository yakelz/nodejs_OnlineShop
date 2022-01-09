const express = require ('express');
const router = express.Router(); 
const userController = require('../controllers/userController');
const {check} = require("express-validator");
const authMiddleware = require ('../middleware/authMiddleware');
const notAuthMiddleware = require ('../middleware/notAuthMiddleware');
const roleMiddleware = require ('../middleware/roleMiddleware');


router.get ('/register',notAuthMiddleware, userController.registration_get);
router.post ('/register',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('email', "Неправильно введен адрес электронной почты").isEmail(),
    check('password', "Длина пароля минимум 6 символов").isLength({min:6})
], userController.registration_post);

router.post ('/login', userController.login_post);
router.get ('/login',notAuthMiddleware,userController.login_get);

router.get ('/logout', authMiddleware, userController.logout_get);

router.get('/users', authMiddleware, roleMiddleware('ADMIN'), userController.getUsers)
module.exports = router;