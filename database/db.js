const sequelize = require('sequelize');

module.exports.sql = new sequelize("pokedex", "rout", "1234", {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});