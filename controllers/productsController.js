const Product = require("../models/Product");
const {validationResult, check} = require("express-validator");
const fs = require('fs-extra');
const resizeImg = require('resize-img');
const path = require('path');
const {mkdirp} = require("fs-extra");

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
        Product.find(function (error, products) {
            res.render('../views/admin/admin_panel', {
                products: products,
            });
        });
    }
    async create_post (req,res) {
        try {
            console.log(req.files);
            const img = typeof req.files.image == "undefined" ? "" : req.files.image.name;
            if (!isImage(img)) {
                return res.status(400).json({message: 'Неподдерживаемый формат изображения'});
            }
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при добавлении продукта',errors});
            }

            console.log(req.body);

            const {title,description,category,price,image} = req.body;

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

}

module.exports = new productsController();