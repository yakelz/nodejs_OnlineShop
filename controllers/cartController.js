const Cart = require("../models/Cart");
const Product = require("../models/Product");
class cartController {
    async cart_get (req, res) {
        Cart.findOne({userId:req.session.user.id},function (error,cart) {
            let total = 0;
            cart.items.forEach(function (item) {
                total = total + item.quantity * item.productId.price;
            });
            try {
                res.render('../views/cart/cart',{
                    products: cart.items,
                    total: total,
                });
            }catch (e) {
                console.log(e);
            }
        }).populate('items.productId')
    }
    async product_add_get (req, res) {
        try {
            Cart.findOne({userId:req.session.user.id},function (error,cart) {
                const productId = req.params.id;
                Product.findById(productId, function (error,product){
                    //вернет индекс продукта в корзине (если такой продукт уже был добавлен)
                    //если не находит, вернет -1

                    const cartProductIndex = cart.items.findIndex(function (cartProduct){
                        return cartProduct.productId.toString() === product._id.toString();
                    });
                    let newQuantity = 1;
                    let updateCartItems = [...cart.items];

                    if (cartProductIndex >=0) {
                        newQuantity = cart.items[cartProductIndex].quantity + 1;
                        updateCartItems[cartProductIndex].quantity = newQuantity;
                    }
                    else {
                        updateCartItems.push({
                            productId: product._id,
                            quantity: newQuantity,
                        })
                    }

                    cart.items = updateCartItems;
                    cart.save();
                    req.flash('message','Продукт добавлен в корзину')
                    res.status(200).redirect('/');
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async product_delete_get (req, res) {
        try {
            Cart.findOne({userId:req.session.user.id}, function (error, cart) {
                Product.findOne({_id:req.params.id}, function (error,product) {
                    const updatedCartItems = cart.items.filter((i) => {
                        return i.productId.toString() !== product._id.toString();
                    });
                    cart.items = updatedCartItems;
                    cart.save();
                    res.redirect('/cart');
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async update_get (req,res) {
        let action = req.query.action;
        try {
            Cart.findOne({userId:req.session.user.id}, function (error, cart) {
                Product.findOne({_id:req.params.id}, function (error, product) {
                    cart.items.filter((i) => {
                        if (i.productId.toString() == product._id.toString()) {
                            switch (action) {
                                case "add":
                                    i.quantity++;
                                    break;
                                case "remove":
                                    if (i.quantity > 1) {
                                        i.quantity--;
                                    } else {
                                        const updatedCartItems = cart.items.filter((i) => {
                                            return i.productId.toString() !== product._id.toString();
                                        });
                                        cart.items = updatedCartItems;
                                    }
                                    break;
                                default:
                                    console.log('Update error');
                                    break;
                            }
                        };
                    });
                    cart.save();
                    res.redirect('/cart');
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    async clear_get (req,res) {
        try {
            Cart.findOne({userId:req.session.user.id}, function (error, cart) {
                cart.items = [];
                cart.save();
                res.redirect('/cart');
            });
        }
        catch (e) {
            console.log(e);
        }
    }
}

module.exports = new cartController();