const Product = require("../models/Product");
const Category = require("../models/Category");
const {validationResult, check} = require("express-validator");
const fs = require('fs-extra');
const resizeImg = require('resize-img');
const path = require('path');
const {mkdirp} = require("fs-extra");

const User = require("../models/User");

function isImage (img) {
    const extension = (path.extname(img)).toLowerCase();
    switch (extension) {
        case  '.jpg':
            return true;
        case  '.jpeg':
            return true;
        case  '.png':
            return true;
        default:
            return false;
    }
}


class productsController {
    async products_get (req,res) {

        //express validator messages
        let errors;
        if (req.session.errors){
            errors = req.session.errors.errors;
        }
        req.session.errors = null

        //flash messages
        let message = req.flash('message');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }

        Category.find(function (error, categories) {
            Product.find(function (error, products) {
                User.findById(req.session.user.id, function (error, user) {
                    res.render('../views/admin/admin_products', {
                        errors: errors,
                        products: products,
                        product: '',
                        search: '',
                        categories: categories,
                        edit: false,
                        admin_name: user.username,
                        admin_email: user.email,
                        message: message,
                    });
                });
            }).populate('category');
        });
    }
    async create_post (req,res) {
        try {
            let img = "";
            if (req.files) {
                img = req.files.image.name;
                if (!isImage(img)) {
                    req.flash('message', 'Неподдерживаемый формат изображения');
                    return res.status(400).redirect('/admin/products/');
                }
            }
            // const img = typeof req.files.image == "undefined" ? "" : req.files.image.name;
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                req.session.errors = errors;
                return res.status(400).redirect('/admin/products/');
            }

            const {title,description,category,price} = req.body;

            Category.findOne({link:category}, await function (error, category) {
                const product = new Product({
                    title: title,
                    link: title.toLowerCase(),
                    description: description,
                    price: price,
                    category: category._id,
                    image: img,
                });

                product.save(function() {
                    mkdirp('public/product_images/' + product._id)
                    mkdirp('public/product_images/' + product._id + '/gallery');
                    mkdirp('public/product_images/' + product._id + '/gallery/thumbs');
                    if (img != "") {
                        const productImg = req.files.image;
                        const path = 'public/product_images/' + product._id + '/' + img;
                        productImg.mv(path);
                    }
                });
            });
            req.flash('message', 'Продукт добавлен');
            return res.status(200).redirect('/admin/products/');
        }
        catch (e) {
            console.log(e);
            req.flash('message', 'Ошибка при добавлении продукта (catch)');
            return res.status(404).redirect('/admin/products/');
        }
    }
    async delete_get (req,res) {
        try {
            const id = req.params.id;
            const path = 'public/product_images/' + id;
            await Product.findByIdAndRemove(id);
            fs.remove(path);
            req.flash('message', 'Продукт удален');
            res.redirect('/admin/products');
        } catch (e) {
            console.log(e);
        }
    }

    async edit_get (req,res) {

        //express validator messages
        let errors;
        if (req.session.errors){
            errors = req.session.errors.errors;
        }
        req.session.errors = null

        //flash messages
        let message = req.flash('message');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }

        Category.find(function (error,categories) {
            Product.find(function (error, products) {
                Product.findById(req.params.id, function (error, product) {
                    User.findById(req.session.user.id, function (error, user) {
                        res.render('../views/admin/admin_products', {
                            errors: errors,
                            products: products,
                            product: product,
                            search: '',
                            categories: categories,
                            edit: true,
                            admin_name: user.username,
                            admin_email: user.email,
                            message: message,
                        });
                    });
                }).populate('category');
            }).populate('category');
        });
    }

    async edit_post (req,res) {
        try {
            let img = "";
            if (req.files) {
                console.log(req.files);
                img = req.files.image.name;
                if (!isImage(img)) {
                    req.flash('message', 'Неподдерживаемый формат изображения');
                    return res.status(400).redirect('/admin/products/');
                }
            }
            // const img = typeof req.files.image == "undefined" ? "" : req.files.image.name;
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                req.session.errors = errors;
                return res.status(400).redirect('/admin/products/');
            }

            const {title,description,category,price} = req.body;
            Category.findOne({link:category}, await function (error, category) {
                Product.findById(req.params.id,function (error, product) {
                    product.title = title;
                    product.link = title.toLowerCase();
                    product.description = description;
                    product.price = price;
                    product.category = category._id;
                    if (img != "") {
                        product.image = img;
                    }
                    product.save(function() {
                        if (img != "") {
                            const productImg = req.files.image;
                            const path = 'public/product_images/' + product._id + '/' + img;
                            productImg.mv(path);
                        }
                    });

                });
            });
            req.flash('message', 'Продукт изменен');
            return res.status(200).redirect('/admin/products/');
        }
        catch (e) {
            console.log(e);
            req.flash('message', 'Ошибка при изменении продукта (catch)');
            return res.status(404).redirect('/admin/products/');
        }
    }
}

module.exports = new productsController();