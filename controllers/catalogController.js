const model = require('../models/Catalog');

// catalog/
exports.index_get = function(req,res) {
    res.render('../views/catalog/index', {
        items: model.getItems()
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


