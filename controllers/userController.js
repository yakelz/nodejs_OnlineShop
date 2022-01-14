const {secretKey} = require('config')
const User = require('../models/User');
const Role = require('../models/Role');
const Cart = require('../models/Cart');
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
            }
            const hashPassword = bcrypt.hashSync (password, 7);
            const userRole = await Role.findOne({value:"USER"});
            const user = new User ({username, email,password: hashPassword, roles:[userRole.value]});
            await user.save();

            const cart = new Cart({userId: user._id})
            await cart.save();

            return res.status(200).json({message: 'Регистрация прошла успешно!'});
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: 'Registration error'});
        }
    }
    async login_get (req,res) {
        console.log(req.session);
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
            req.session.userToken = token;
            req.session.isLogin = true;
            if (user.roles.includes('ADMIN')) {
                req.session.isAdmin = true;
            }
            console.log(req.session)
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

    async logout_get(req, res) {
        req.session.destroy(err => {
            if (err) console.log(err);
            res.redirect('/');
        });

    }
}

module.exports = new userController();