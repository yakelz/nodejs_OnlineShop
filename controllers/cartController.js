const Cart = require("../models/Cart");
const Product = require("../models/Product");
class cartController {
    async cart_get (req, res) {
        Cart.findOne({userId:req.session.user.id},function (error,cart) {
            console.log('cart items:')
            console.log(cart.items);
            try {
                res.render('../views/cart/cart',{
                    products: cart.items
                });
            }catch (e) {
                console.log(e);
            }
        }).populate('items.productId');
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

                    console.log('UpdateCartItems:')
                    console.log(updateCartItems);

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
                    console.log('!UpdateCartItems:')
                    console.log(updateCartItems);

                    cart.items = updateCartItems;
                    cart.save();
                    return res.status(200).json({message:"Продукт добавлен в корзину"});
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