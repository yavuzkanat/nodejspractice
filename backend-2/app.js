const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const errorController = require('./controller/error');

//path
app.use(express.urlencoded({ extended: true }));

// pug template 
app.set('view engine','pug');
app.set('views','./view')

// public static files
app.use(express.static(path.join(__dirname, 'public')));



//routes
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404Page);



app.listen(3000, () => {
    
});