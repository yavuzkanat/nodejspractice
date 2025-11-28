const {Sequelize} = require('sequelize');
const sequelize = require('../utility/database');

const User = sequelize.define(
    'user',
    {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },
        email:Sequelize.STRING,
        password:Sequelize.STRING,
        isAdmin:Sequelize.BOOLEAN
    }
);

module.exports = User;