const model = require('../models/Catalog');
const Product = require("../models/Product");
const Category = require("../models/Category");
// index page /

class catalogController {
    async index_get(req,res) {
        //flash messages
        let message = req.flash('message');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        // const user = users.find(user => user._id === req.session.userId);
        Category.find(function (error, categories) {
            Product.find(function (error, products) {
                res.render('../views/catalog/index', {
                    search: '',
                    categories: categories,
                    products: products,
                    isLogin: req.session.isLogin,
                    isAdmin: req.session.isAdmin,
                    message: message,
                });
            });
        });
    }
    async page_get(req,res) {

    }
    async products_get(req,res) {
        //flash messages
        let message = req.flash('message');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        const categoryLink = req.params.category;
        Category.find(function (error, categories){
            Category.findOne ({link: categoryLink}, function (error, category) {
                Product.find({category: category._id},function (error,products) {
                    res.render('../views/catalog/index', {
                        search: '',
                        categories: categories,
                        products: products,
                        isLogin: req.session.isLogin,
                        isAdmin: req.session.isAdmin,
                        message: message,
                    });
                });
            });
        });
    }

    async search_post (req,res) {
        //flash messages
        let message = req.flash('message');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        const search = req.body.search;
        Category.find(function (error, categories) {
            Product.find({$or:[
                {link: {'$regex': search}},
                {title: {'$regex': search}},
                ]},
                function (error, products) {
                    res.render('../views/catalog/index', {
                        search: search,
                        categories: categories,
                        products: products,
                        isLogin: req.session.isLogin,
                        isAdmin: req.session.isAdmin,
                        message: message,
                });
            });
        });
    }
}
module.exports = new catalogController();


