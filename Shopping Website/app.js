// modules
const express = require('express');
const session = require('express-session');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const errorController = require('./controller/error');
const sequelize = require('./utility/database');
const Categories = require('./models/category');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const cartItem = require('./models/cartItem');
const loginRoutes = require('./routes/login');
const sessionMidWare = require('./middlewares/session');
const createCart  = require('./middlewares/cart');
const fileUpload = require('express-fileupload');


//path
app.use(express.urlencoded({ extended: true }));

//session
app.use(session({
  secret: 's3cr3TwOrlDhAsh',
  resave: false,
  saveUninitialized : false,
  cookie:{secure:false},
}));
app.use(sessionMidWare.saveSession);
app.use(createCart.createCart);
//express file upload 
app.use(fileUpload());

// pug template 
app.set('view engine', 'pug');
app.set('views', './view')

// public static files
app.use(express.static(path.join(__dirname, 'public')));



// Category - Product 
Categories.hasMany(Product);
Product.belongsTo(Categories);

// User - Product
Product.belongsTo(User);
User.hasMany(Product);

// User - Cart
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart - Producy (many to many)
Cart.belongsToMany(Product, { through: cartItem });
Product.belongsToMany(Cart, { through: cartItem });



// Routes
app.use('/admin', adminRoutes);
app.use(loginRoutes);
app.use(shopRoutes);
app.use(errorController.get404Page);


// DB
sequelize
  .sync()
  .then(() => {
    
  })
  .catch((err) => {
    console.log(err);
  })

// App Start
app.listen(3000, () => {

});