const model = require('../models/Catalog');
const Product = require("../models/Product");
const Category = require("../models/Category");
// index page /

class catalogController {
    async index_get(req,res) {
        // const user = users.find(user => user._id === req.session.userId);
        Category.find(function (error, categories) {
            Product.find(function (error, products) {
                console.log(products);
                res.render('../views/catalog/index', {
                    search: '',
                    categories: categories,
                    products: products,
                    isLogin: req.session.isLogin,
                    isAdmin: req.session.isAdmin
                });
            });
        });
    }
    async page_get(req,res) {

    }
    async products_get(req,res) {
        const categoryLink = req.params.category;
        Category.find(function (error, categories){
            Category.findOne ({link: categoryLink}, function (error, category) {
                Product.find({category: category.link},function (error,products) {
                    res.render('../views/catalog/index', {
                        search: '',
                        categories: categories,
                        products: products,
                        isLogin: req.session.isLogin,
                        isAdmin: req.session.isAdmin
                    });
                });
            });
        });
    }

    async search_post (req,res) {
        const search = req.body.search;
        Category.find(function (error, categories) {
            Product.find({$or:[
                {link: {'$regex': search}},
                {title: {'$regex': search}},
                {category: {'$regex': search}}
                ]},
                function (error, products) {
                    res.render('../views/catalog/index', {
                        search: search,
                        categories: categories,
                        products: products,
                        isLogin: req.session.isLogin,
                        isAdmin: req.session.isAdmin
                });
            });
        });
    }
}
module.exports = new catalogController();


