// shop controller 


const Category = require('../models/category');
const Products = require('../models/product');

exports.getHome = (req, res, next) => {

    res.render('shop/index', { 
        title: 'HomePage', 
        path: req.path 
    });

}

exports.getProducts = (req,res,next) => {
    const products = Products.getAll();
    const cat = Category.getAllCategories();
    res.render('shop/products',{
        title:"Products",
        products : products,
        categories : cat,
        path:req.path
    });
}
exports.getProductByCategory =(req, res, next) => {
    const catID = req.params.categoryID;
    const product = Products.getByCategoryID(catID);
    const cat = Category.getAllCategories();
    
   
    res.render('shop/details-by-cat',{
        title:`Category`,
        product : product,
        path: "/products",
        categories : cat,
        selectedCat : catID,
        
    });

}

exports.getTheProduct = (req, res, next) => {
    const productID = req.params.productID;
    const product = Products.getByID(productID);
    res.render('shop/details',{
        title:`Detail |  ${product.name}`,
        product : product,
        path: "products"
    });
    
}

exports.getProductsDetails = (req,res,next) => {
    const products = Products.getAll()
    res.render('shop/details',{
        title:"Details",
        path:req.path
    });
}

exports.getCart = (req,res,next) => {
    
    res.render('shop/cart',{
        title:"Cart",
        path:'/cart'
    });
}

exports.getOrders = (req,res,next) => {

    res.render('shop/orders',{
            title:"Orders",
            path:'/orders'
        });
}


