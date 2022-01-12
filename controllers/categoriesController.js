const Category = require("../models/Category");
const User = require("../models/User");
const {validationResult} = require("express-validator");
const Product = require("../models/Product");
const fs = require("fs-extra");

class categoriesController {
    async categories_get (req,res) {
        Category.find(function (error, categories) {
            User.findById(req.session.user.id, function (error, user) {
                res.render('../views/admin/admin_categories', {
                    categories: categories,
                    admin_name: user.username,
                    admin_email: user.email,
                    edit: false,
                });
            });
        });
    }
    async create_post (req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при добавлении категории',errors});
            }
            console.log(req.body);
            const title = req.body.title;
            const category = new Category({
                title: title,
                link: title.toLowerCase()
            });
            await category.save (function() {

            })
            return res.status(200).json({message: 'Категория добавлена'});
        }
        catch (e) {
            console.log(e);
            return res.status(404).json({message: 'Ошибка при добавлении категории (catch)'});
        }
    }
    async edit_get (req,res) {
        Category.find(function (error, categories) {
            Category.findById(req.params.id, function (error, category) {
                User.findById(req.session.user.id, function (error, user) {
                    res.render('../views/admin/admin_categories', {
                        categories: categories,
                        category: category,
                        admin_name: user.username,
                        admin_email: user.email,
                        edit:true,
                    });
                });
            });
        });
    }
    async edit_post (req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при изменении категории',errors});
            }
            console.log(req.body);

            const title = req.body.title;

            Category.findById(req.params.id,function (error, category) {
                category.title = title;
                category.link = title.toLowerCase();
                category.save();
            });

            return res.status(200).json({message: 'Категория изменена'});
        }
        catch (e) {
            console.log(e);
            return res.status(404).json({message: 'Ошибка при изменении категории (catch)'});
        }
    }
    async delete_get (req,res) {
        try {
            const id = req.params.id;
            await Category.findByIdAndRemove(id);
            //here notice about deleting
            res.redirect('/admin/categories');
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new categoriesController();