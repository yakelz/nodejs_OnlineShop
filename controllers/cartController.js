const Cart = require("../models/Cart");
const Product = require("../models/Product");
class cartController {
    async cart_get (req, res) {
        Cart.findOne({userId:req.session.user.id},function (error,cart) {
            try {
                console.log(cart.products);
                res.render('../views/cart/cart',{
                    products: cart.products,
                });
            }catch (e) {
                console.log(e);
            }
        });
    }
    async product_add_get (req, res) {
        try {
            Cart.findOne({userId:req.session.user.id}, function (error, cart) {
                let equal = false;
                cart.products.forEach(product => {
                    if (product._id == req.params.id) {
                        equal = true;
                    }
                });
                if (equal) {
                    return res.status(400).json({message: "Повтор"});
                }
                console.log('after if');
                Product.findById(req.params.id, function (error,product) {
                    cart.products.push(product);
                    cart.save();
                    return res.status(200).json({message: "Продукт добавлен в корзину"});
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async product_delete_get (req, res) {
        Cart.findOne({userId:req.session.user.id}, function (error, cart) {
            Product.findOne({_id:req.params.id}, function (error,product) {
                cart.products.remove(product);
                cart.save();
                res.redirect('/cart');
            });
        });
    }
}

module.exports = new cartController();