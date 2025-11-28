const User = require('../models/user');



exports.getLogin = (req, res, next) => {
    res.render('shop/login', {
        title: 'Login',
        path: '/login'
    }
    );
}



exports.postLogin = (req, res, next) => {

    return User.findOne({ where: { email: req.body.email, password: req.body.password } })
        .then((value) => {
            if (value !== null) {
                req.session.isLoggedIn = true;
                req.session.userId = value.id;
                req.session.isAdmin = value.isAdmin;
                req.session.mail = value.email;
                
                return req.session.save(err => {
                    res.redirect("/");
                })
            } else {
                res.render('shop/login', {
                    title: 'Login',
                    path: '/login',
                    msg: 'Password or email is incorrect.'
                }
                );
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.getRegister = (req, res, next) => {
    res.render('shop/register', {
        title: 'register',
        path: '/register'
    }
    );
}

exports.postRegister = (req, res, next) => {
  
    
    User.findOne({ where: { email: req.body.email } })
        .then((result) => {
            if (result) {
                return res.render("shop/register", {
                    title: "Register",
                    path: "/register",
                    msg: "Email already taken."
                });
          
            } else {
                return User.create({
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: false
                }).then((result) => {
                    if (result) {
                        return res.redirect('/login');
                    }


                }).catch((err) => {
                    console.log(err);
                });
            }
        }).catch((err) => {
            console.log(err);

            res.render("shop/register", {
                title: "Register",
                path: "/register",
                msg: "An error occurred!"
            });
        });



}

exports.logoutPost =  (req, res) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}