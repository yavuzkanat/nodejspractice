// via mysql2



// const mysql = require('mysql2');

// const connection = mysql.createConnection(
//     {
//         host : "127.0.0.1",
//         database : "node-app",
//         user : "root",
//         password : "",


//     }
// );

// module.exports = connection.promise();
// 


const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-app','root','',{
    dialect: 'mysql',
    host:'localhost',
});

module.exports = sequelize;