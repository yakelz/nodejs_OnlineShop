const Category = require("../models/Category");

class categoriesController {
    async categories_get (req,res) {
        res.render ('../views/admin/admin_panel');
    }
    async create_post (req,res) {

    }
}

module.exports = new categoriesController();