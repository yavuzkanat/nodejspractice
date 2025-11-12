const Category = require("../models/category");
const Products = require("../models/product");

// admin controller 



exports.getProducts = (req, res, next) => {
    res.render('admin/products',
        {
        title:"Admin Products",
        path:'/admin/products',
        products : Products.getAll(),
        action: req.query.action 
    });
    
}

exports.getAddProduct = (req, res, next) => {
    const categories = Category.getAllCategories();
    res.render('admin/add-product',
        {title:"Admin Products",
        path:req.path,
        categories : categories
    });
    
}

exports.postAddProduct = (req, res, next) => {
    const products = new Products(
        req.body.productName,
        req.body.productPrice,
        req.body.productImg,
        req.body.productDesc,
        req.body.categoryid
    );
    products.saveProduct();
    console.log(req.body);
    res.redirect('/products');
}


exports.getEditProduct = (req, res, next) => {
    const product =  Products.getByID(req.params.productID);
    const categories = Category.getAllCategories();
    res.render('admin/edit-product',
        {
        title:"Edit Products",
        path:'/admin/products',
        product : product,
        categories : categories
  
    });
    
}

exports.postEditProduct = (req, res, next) => {
    Products.updateProduct(req.params.productID,req.body.productName,req.body.productPrice,req.body.productImg,req.body.productDesc,req.body.categoryid);
    res.redirect('/admin/products?action=edit');
}

exports.postdeleteProduct = (req,res,next) => {
    Products.delete(req.body.id);
    res.redirect('/admin/products?action=delete')
}