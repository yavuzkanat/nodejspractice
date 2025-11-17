const { Sequelize } = require('sequelize');
const sequelize = require('../utility/database');

const Categories = sequelize.define(
    'categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:  Sequelize.STRING(),
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    }

});

module.exports = Categories;