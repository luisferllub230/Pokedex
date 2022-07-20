const sequelize = require('sequelize');
const db = require('../database/db');

module.exports.regionsT = db.sql.define('regionsT',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    regionName:{
        type: sequelize.STRING,
        allowNull: false
    },
});