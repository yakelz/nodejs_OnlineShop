// exports.register_get = function(req,res) {
//     // res.send ('register page' + '<br>' +
//     // 'method:' + req.method)
//     res.render ('../views/user/register')
// };
// exports.register_post = function(req,res) {
//     res.send ('register page' + '<br>' +
//     'method:' + req.method)
// };

// exports.login_get = function(req,res) {
//     // res.send ('login page' + '<br>' +
//     // 'method:' + req.method)
//     res.render ('../views/user/auth')
// };
// exports.login_post = function(req,res) {
//     res.send ('login page' + '<br>' +
//     'method:' + req.method)
// };

// exports.logout_get = function(req,res) {
//     res.send ('logout page' + '<br>' +
//     'method:' + req.method)
// };

// exports.logout_post = function(req,res) {
//     res.send ('logout page' + '<br>' +
//     'method:' + req.method)
// };

const {secretKey} = require('config')
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require ('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, email,roles) => {
    const payLoad = {
        id,
        email,
        roles
    }
    return jwt.sign(payLoad, secretKey, {expiresIn: "24h"});
}

class userController {
    async registration_get (req,res) {
        res.render ('../views/user/register');
    }
    async registration_post(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации',errors});
            }
            const {username, email, password} = req.body;
            const condidate = await User.findOne({email});
            if (condidate) {
                return res.status(400).json({message: 'Пользователь с таким Email уже существует'});
                // return res.status(400).render('../views/user/register', {
                //     errorMessage: 'Пользователь с таким Email уже существует',
                // });
            }
            const hashPassword = bcrypt.hashSync (password, 7);
            const userRole = await Role.findOne({value:"USER"});
            const user = new User ({username, email,password: hashPassword, roles:[userRole.value]});
            await user.save();
            return res.status(200).json({message: 'Регистрация прошла успешно!'});
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: 'Registration error'});
        }
    }
    async login_get (req,res) {
        res.render ('../views/user/auth');
    }
    async login_post (req, res) {
        try {
            const {email,password} = req.body;

            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: `Неправильно набран логин или пароль`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Неправильно набран логин или пароль`});
            }
            const token = generateAccessToken(user._id, user.email, user.roles);
            // res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 });
            return res.status(200).json({token});

        } catch (e) {
            console.log(e);
            return res.status(400).json({message: 'Login error'});
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            
        }
    }
}

module.exports = new userController();