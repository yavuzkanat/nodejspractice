const Category = require("../models/category");
const Products = require("../models/product");

// admin controller 



exports.getProducts = (req, res, next) => {
    Products.findAll()
        .then((products) => {
            return Category.findAll()
                .then((categories) => {
                    res.render('admin/products', {
                        title: "Products",
                        products: products,
                        categories: categories,
                        path: "/admin/products",
                        action: req.query.action
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAddProduct = (req, res, next) => {


    res.render('admin/add-product',
        {
            title: "Admin Products",
            path: "/admin/add-product",
            action: req.query.action
        });


}

exports.postAddProduct = (req, res, next) => {


    Products.create(
        {
            name: req.body.productName,
            price: req.body.productPrice,
            imgUrl: req.body.productImg,
            description: req.body.productDesc,

        }
    )
        .then(() => {
            res.redirect('/admin/products?action=add');
        }).catch((err) => {
            console.log(err);
        });

}


exports.getEditProduct = (req, res, next) => {

    Products.findOne({where :{id:req.params.productID}})
        .then((products) => {
            res.render('admin/edit-product', {
                title: "Products",
                product: products,
                path: "/products",
                //categories: Category.findAll(),
                path: req.path,

            });
        }).catch((err) => {
            console.log(err);
        });


}

exports.postEditProduct = (req, res, next) => {

    Products.update({name:req.body.productName,price:req.body.productPrice,imageUrl: req.body.productImg,description: req.body.description} ,{where:{id:req.params.productID}})
        .then(() => {
            res.redirect('/admin/products?action=edit');
        }).catch((err) => {
            console.log(err);
        });

}

exports.postdeleteProduct = (req, res, next) => {

    Products.destroy({
        where: {
            id: req.body.productid,
        },
    })
        .then(() => {
            res.redirect('/admin/products?action=delete')
        }).catch((err) => {
            console.log(err);
        });

}