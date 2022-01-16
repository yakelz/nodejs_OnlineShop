const Category = require("../models/Category");
const User = require("../models/User");
const {validationResult} = require("express-validator");
const Product = require("../models/Product");
const fs = require("fs-extra");

class categoriesController {
    async categories_get (req,res) {
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
            User.findById(req.session.user.id, function (error, user) {
                res.render('../views/admin/admin_categories', {
                    errors: errors,
                    categories: categories,
                    search: '',
                    admin_name: user.username,
                    admin_email: user.email,
                    edit: false,
                    message: message,
                });
            });
        });
    }
    async create_post (req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                req.session.errors = errors;
                return res.status(400).redirect('/admin/categories/');
            }
            const title = req.body.title;
            const category = new Category({
                title: title,
                link: title.toLowerCase()
            });
            await category.save (function() {

            })
            req.flash('message', 'Категория добавлена');
            return res.status(200).redirect('/admin/categories/');
        }
        catch (e) {
            console.log(e);
            req.flash('message', 'Ошибка при добавлении категории (catch)');
            return res.status(404).redirect('/admin/categories/');
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

        Category.find(function (error, categories) {
            Category.findById(req.params.id, function (error, category) {
                User.findById(req.session.user.id, function (error, user) {
                    res.render('../views/admin/admin_categories', {
                        errors: errors,
                        categories: categories,
                        category: category,
                        search: '',
                        admin_name: user.username,
                        admin_email: user.email,
                        edit:true,
                        message: message,
                    });
                });
            });
        });
    }
    async edit_post (req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                req.session.errors = errors;
                return res.status(400).redirect('/admin/categories/');
            }

            const title = req.body.title;

            Category.findById(req.params.id,function (error, category) {
                category.title = title;
                category.link = title.toLowerCase();
                category.save();
            });
            req.flash('message', 'Категория изменена');
            return res.status(200).redirect('/admin/categories/');
        }
        catch (e) {
            console.log(e);
            req.flash('message', 'Ошибка при изменении категории (catch)');
            return res.status(404).redirect('/admin/categories/');
        }
    }
    async delete_get (req,res) {
        try {
            const id = req.params.id;
            await Category.findByIdAndRemove(id);
            req.flash('message', 'Категория удалена');
            res.redirect('/admin/categories');
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new categoriesController();