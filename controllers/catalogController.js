const model = require('../models/Catalog');
const Product = require("../models/Product");
// catalog/
exports.index_get = function(req,res) {
    // const user = users.find(user => user._id === req.session.userId);
    Product.find(function (error, products) {
        res.render('../views/catalog/index', {
            products: products,
            isLogin: req.session.isLogin,
            isAdmin: req.session.isAdmin
        });
    });
    // res.send ('index_get' + '<br>'+ 
    // 'method: '+ req.method + '<br>'+ 
    // 'URL: ' + req.originalUrl)
};
// catalog/:page
exports.page_get = function(req,res) {
    res.send ('page_get' + '<br>'+ 
    'page: ' + req.params.page + '<br>'+
    'method: '+ req.method + '<br>'+ 
    'URL: ' + req.originalUrl)
};

// catalog/item/:id
exports.item_id_get = function(req,res) {
    res.send ('item_id_get' + '<br>'+
    'id: ' + req.params.id + '<br>'+
    'method: '+ req.method + '<br>'+ 
    'URL: ' + req.originalUrl)
};

// catalog/item/create
exports.item_create_get = function(req,res) {
    res.send ('item_create_get' + '<br>'+
    'method: '+ req.method + '<br>'+ 
    'URL: ' + req.originalUrl)
};
exports.item_create_post = function(req,res) {
    res.send ('item_create_post' + '<br>'+
    'method: '+ req.method + '<br>'+ 
    'URL: ' + req.originalUrl)
};

// catalog/item/edit
exports.item_edit_get = function(req,res) {
    res.send ('item_edit_get' + '<br>'+
    'method: '+ req.method + '<br>'+ 
    'URL: ' + req.originalUrl)
};
exports.item_edit_post = function(req,res) {
    res.send ('item_edit_post' + '<br>'+
    'method: '+ req.method + '<br>'+ 
    'URL: ' + req.originalUrl)
};

// catalog/item/delete
exports.item_delete_post = function(req,res) {
    res.send ('item_delete_post' + '<br>'+
    'method: '+ req.method + '<br>'+ 
    'URL: ' + req.originalUrl)
};


