// shop controller 


const Category = require('../models/category');
const Products = require('../models/product');

exports.getHome = (req, res, next) => {

    res.render('shop/index', {
        title: 'HomePage',
        path: req.path
    });

}

exports.getAllProducts = (req, res, next) => {
 
    Products.findAll()
        .then((products) => {
            Category.findAll()
            .then((cat) => {
                res.render('shop/products', {
                title: "Products",
                products: products,
                categories: cat,
                path: req.path
            });
            }).catch((err) => {
                console.log(err);
            });

           
        }).catch((err) => {
            console.log(err);
        });


}
exports.getProductByCategory = (req, res, next) => {
        Products.getByCategoryID(req.params.categoryID)
        .then((products) => {
            Category.findAll()
            .then((cat) => {
                res.render('shop/products', {
                title: "Products",
                products: products,
                //categories: cat,
                selectedCat : req.params.categoryID,
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
        attributes:['id','name','price','imgUrl','description'],
        where:{id:req.params.detailID},
    })
        .then((products) => {
            res.render('shop/details', {
                title: `Product | ${products.name}`,
                product: products,
                path: req.path
            });
          
        }).catch((err) => {
            console.log(err);
        });

}

exports.getCart = (req, res, next) => {

    res.render('shop/cart', {
        title: "Cart",
        path: '/cart'
    });
}

exports.getOrders = (req, res, next) => {

    res.render('shop/orders', {
        title: "Orders",
        path: '/orders'
    });
}


