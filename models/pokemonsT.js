const sequelize = require('sequelize');
const db = require('../database/db');

module.exports.pokemonsT = db.sql.define('pokemonsT', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pokemonName: {
        type: sequelize.STRING,
        allowNull: false
    },
    image: {
        type: sequelize.STRING,
        allowNull: false
    }
});
