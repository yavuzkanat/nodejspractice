const session = require("express-session");


exports.saveSession = (req,res,next) => {

    res.locals.session = req.session;
    next();

}

exports.checkTheSession = (req,res,next) => {
    if (!req.session.isLoggedIn){
        return res.redirect('/login')
    }else{
        if(req.session.isAdmin == false){
            return res.statusCode = 404;
            
        }
        next();
    }
}

exports.destroySession = (req,res,next) => {
    
}