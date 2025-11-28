const path = require("path");
const Category = require("../models/category");
const Products = require("../models/product");

// admin get products
exports.getProducts = (req, res, next) => {
    Products.findAll()
        .then((products) => {
            return Category.findAll({ attributes: ['id', 'name'] })
                .then((cat) => {
                    res.render('admin/products', {
                        title: "Products",
                        products: products,
                        categories: cat,
                        path: "/admin/products",
                        action: req.query.action,
                        session: req.session
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
};

//get add-products
exports.getAddProduct = (req, res, next) => {

    Products.findAll()
        .then((products) => {
            return Category.findAll()
                .then((cat) => {
                    res.render('admin/add-product',
                        {
                            title: "Admin Products",
                            path: "/admin/add-product",
                            categories: cat,
                            products: products,
                            action: req.query.action,
                            session: req.session
                        });

                });
        })
        .catch(err => {
            console.log(err);
        });


}

//post add-products to DB
exports.postAddProduct = (req, res, next) => {


    Products.create(
        {
            name: req.body.productName,
            price: req.body.productPrice,
            imgUrl: req.body.productImg,
            description: req.body.productDesc,
            categoryId: req.body.categoryid,


        }
    )
        .then(() => {
            res.redirect('/admin/products?action=add');
        }).catch((err) => {
            console.log(err);
        });

}

//
exports.getEditProduct = (req, res, next) => {

    Products.findOne({ where: { id: req.params.productID } })
        .then((products) => {
            Category.findAll()
                .then((cat) => {
                    res.render('admin/edit-product', {
                        title: "Products",
                        product: products,
                        categories: cat,
                        path: "/products",
                        session: req.session


                    });
                }).catch((err) => {

                })

        }).catch((err) => {
            console.log(err);
        });


}

exports.postEditProduct = (req, res, next) => {

    Products.update({ name: req.body.productName, price: req.body.productPrice, imageUrl: req.body.productImg, description: req.body.description, categoryId: req.body.categoryid }, { where: { id: req.params.productID } })
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

exports.getCategory = (req, res, next) => {
    Category.findAll()
        .then((Category) => {
            res.render('admin/category', {
                title: "Category",
                categories: Category,
                path: "/admin/category",
                session: req.session,
                action: req.query.action

            })
          
        }).catch((err) => {
            console.log(err);
        });
}

exports.getAddCategory = (req, res, next) => {

    res.render('admin/add-category', {
        title: "Category",
        path: "/admin/category",
        session: req.session,
        action: req.query.action

    })
}




exports.postAddCategory = (req, res, next) => {


    Category.create(
        {
            name: req.body.categoryName,
            description: req.body.categoryDesc,



        }
    )
        .then(() => {
            res.redirect('/admin/category?action=add');
        }).catch((err) => {
            console.log(err);
        });

}

exports.postDeleteCategory = (req, res, next) => {
    Category.destroy({
        where: {
            id: req.body.catId,
        },
    })
        .then(() => {
            res.redirect('/admin/category?action=delete')
        }).catch((err) => {
            console.log(err);
        });

}
exports.getUploadFile = (req, res, next) => {
    res.render('admin/upload-file', {
        title: "File Upload",
        session: req.session

    })
}
exports.postUploadFile = (req, res, next) => {
    let msg = "";
    let uploadedFile = null;

    if (!req.files || !req.files.file) {
        msg = "File couldn't upload.";
        return res.render("admin/upload-file", {
            title: "File Upload",
            session: req.session,
            msg,
            uploadedFile
        });
    }

    const file = req.files.file;

    // ---- SETTINGS ----
    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    // -------------------

    // SIZE CHECK
    if (file.size > MAX_SIZE) {
        msg = "Max file size is 2 MB.";
        return res.render("admin/upload-file", {
            title: "File Upload",
            session: req.session,
            msg,
            uploadedFile
        });
    }

    // TYPE CHECK
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
        msg = "Only Image Files (jpg, png, webp).";
        return res.render("admin/upload-file", {
            title: "File Upload",
            session: req.session,
            msg,
            uploadedFile
        });
    }

    // SAVE LOCATION
    const uploadPath = path.join(__dirname, "..", "public", "img", file.name);
   
    // SAVE FILE
    file.mv(uploadPath, (err) => {
        if (err) {
            msg = "File could not be saved.";
            return res.render("admin/upload-file", {
                title: "File Upload",
                session: req.session,
                msg,
                uploadedFile
            });
        }

        uploadedFile = file;

        return res.render("admin/upload-file", {
            title: "File Upload",
            session: req.session,
            msg: "Uploaded Successfully!",
            uploadedFile
        });
    });
};