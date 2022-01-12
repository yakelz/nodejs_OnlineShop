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
        Category.find(function (error, catergories) {
            Product.find(function (error, products) {
                User.findById(req.session.user.id, function (error, user) {
                    res.render('../views/admin/admin_products', {
                        products: products,
                        product: '',
                        categories: catergories,
                        edit: false,
                        admin_name: user.username,
                        admin_email: user.email,
                    });
                });
            });
        });
    }
    async create_post (req,res) {
        try {
            let img = "";
            if (req.files) {
                img = req.files.image.name;
                if (!isImage(img)) {
                    // req.flash('message', 'Неподдерживаемый формат изображения');
                    // res.locals.message = req.flash();
                    return res.status(400).json({message: 'Неподдерживаемый формат изображения'});
                }
            }
            // const img = typeof req.files.image == "undefined" ? "" : req.files.image.name;
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при добавлении продукта',errors});
            }
            console.log(req.body);

            const {title,description,category,price} = req.body;
            const product = new Product({
                title: title,
                link: title.toLowerCase(),
                description: description,
                price: price,
                category: category,
                image: img,
            });

            await product.save(function() {
                mkdirp('public/product_images/' + product._id)
                mkdirp('public/product_images/' + product._id + '/gallery');
                mkdirp('public/product_images/' + product._id + '/gallery/thumbs');
                if (img != "") {
                    const productImg = req.files.image;
                    const path = 'public/product_images/' + product._id + '/' + img;
                    productImg.mv(path);
                }
            });

            return res.status(200).json({message: 'Продукт добавлен'});
        }
        catch (e) {
            console.log(e);
            return res.status(404).json({message: 'Ошибка при добавлении продукта (catch)'});
        }
    }
    async delete_get (req,res) {
        try {
            const id = req.params.id;
            const path = 'public/product_images/' + id;
            await Product.findByIdAndRemove(id);
            fs.remove(path);
            //here notice about deleting
            res.redirect('/admin/products');
        } catch (e) {
            console.log(e);
        }
    }

    async edit_get (req,res) {
        Category.find(function (error,categories) {
            Product.find(function (error, products) {
                Product.findById(req.params.id, function (error, product) {
                    User.findById(req.session.user.id, function (error, user) {
                        res.render('../views/admin/admin_products', {
                            products: products,
                            product: product,
                            categories: categories,
                            edit: true,
                            admin_name: user.username,
                            admin_email: user.email
                        });
                    });
                });
            });
        });
    }

    async edit_post (req,res) {
        try {
            let img = "";
            if (req.files) {
                console.log(req.files);
                img = req.files.image.name;
                if (!isImage(img)) {
                    return res.status(400).json({message: 'Неподдерживаемый формат изображения'});
                }
            }
            // const img = typeof req.files.image == "undefined" ? "" : req.files.image.name;
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при изменении продукта',errors});
            }
            console.log(req.body);

            const {title,description,category,price} = req.body;

            Product.findById(req.params.id,function (error, product) {
               product.title = title;
               product.link = title.toLowerCase();
               product.description = description;
               product.price = price;
               product.category = category;
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

            return res.status(200).json({message: 'Продукт изменен'});
        }
        catch (e) {
            console.log(e);
            return res.status(404).json({message: 'Ошибка при изменении продукта (catch)'});
        }
    }
}

module.exports = new productsController();