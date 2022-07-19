const sequelize = require('sequelize');
const db = require('../database/db');

module.exports.pokemonsT = db.sql.define('pokemonsT', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
});
