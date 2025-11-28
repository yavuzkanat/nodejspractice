//shop controller 




const cartItem = require('../models/cartItem');
const Category = require('../models/category');
const Products = require('../models/product');

exports.getHome = (req, res, next) => {

    res.render('shop/index', {
        title: 'HomePage',
        path: req.path,
        session:req.session
    });


}

exports.getAllProducts = (req, res, next) => {

    Products.findAll()
        .then((products) => {
            Category.findAll()
                .then((cat) => {
                    console.log(cat);
                    res.render('shop/products', {
                        title: "Products",
                        products: products,
                        categories: cat,
                        path: req.path,
                        session:req.session

                    });
                }).catch((err) => {
                    console.log(err);
                });


        }).catch((err) => {
            console.log(err);
        });


}
exports.getProductByCategory = (req, res, next) => {
    Products.findAll({ where: { categoryId: req.params.categoryID } })
        .then((products) => {
            Category.findAll()
                .then((cat) => {
                    res.render('shop/products', {
                        title: "Products",
                        products: products,
                        categories: cat,
                        selectedCat: req.params.categoryID,
                        session:req.session,
                        path: req.path
                    });
                }).catch((err) => {
                    console.log(err);
                });


        }).catch((err) => {
            console.log(err);
        });


}


exports.getProductsDetails = (req, res, next) => {

    Products.findOne({
        attributes: ['id', 'name', 'price', 'imgUrl', 'description'],
        where: { id: req.params.detailID },
    })
        .then((products) => {
            res.render('shop/details', {
                title: `Product | ${products.name}`,
                product: products,
                session:req.session,
                path: req.path
            });

        }).catch((err) => {
            console.log(err);
        });

}

exports.postCart = (req,res,next) =>{
    req.cart
        .getProducts({where : {id:req.body.productId}})
        .then((products) => {
            let product = products[0];
            if(product){
                newQty = product.cartItem.quantity + 1;
                return req.cart.addProduct(product,{through : {quantity:newQty}});
            }
            return Products.findByPk(req.body.productId)
            .then(product =>  {
                return req.cart.addProduct(product,{through : {quantity : 1}});
            })
        }).then(()=> {
            res.redirect('/cart');
        });
} 

exports.getCart = (req,res,next) => {
    req.cart
        .getProducts()
        .then((products) => {
            res.render('shop/cart',{
                title:"Cart",
                products:products,
                path:req.path,
                session:req.session
            })
        }).catch((err) => {
            
        });
}

exports.postDeleteOrder = (req, res, next) => {

    req.cart
        .getProducts({ where: { id: req.body.productId } })
        .then(products => {
            const product = products[0];
            if (!product) {
                return next();
            }

            if (product.cartItem.quantity > 1) {
                // quantity azalt
                product.cartItem.quantity -= 1;
                return product.cartItem.save();
            } else {
                // quantity 1 ise sil
                return product.cartItem.destroy();
            }
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}


