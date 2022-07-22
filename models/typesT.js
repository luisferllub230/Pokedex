const sequelize = require('sequelize');
const db = require('../database/db');

module.exports.typesT = db.sql.define('typesT',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    typeName:{
        type: sequelize.STRING,
        allowNull: false
    },
});