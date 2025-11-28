const User = require("../models/user");

exports.createCart = (req, res, next) => {
    if (!req.session.userId) {
        return next();
    }
    User.findByPk(req.session.userId).
        then((result) => {
            if (!result) {
                return next();
            } 
            req.user = result
            return req.user.getCart();
        }).then((cart) => {
            if(!cart){
                return req.user.createCart();
            }
            return cart

        }).then((cart) => {
            req.cart = cart;
            next()
        })
        .catch((err) => {
            console.log(err);
        });
   
}