const {Sequelize} = require('sequelize');
const sequelize = require('../utility/database');

const Product = sequelize.define(
    'product',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.CHAR(255),
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL(10,0),
            allowNull: false,
        }, 
        imgUrl: {
            type: Sequelize.CHAR(45),
            allowNull: false,
        },
        description:{
            type:Sequelize.TEXT,
            allowNull:false,
        }
});

module.exports = Product;