const pkTable = require('../models/pokemonsT');
const ttTable = require('../models/typesT');
const rgTable = require('../models/regionsT');

exports.GetHome = (req, res, next) => {
    pkTable.pokemonsT.findAll({
        include: [{model: ttTable.typesT}, {model: rgTable.regionsT}]
    }).then(pokemons => {

        const pk = pokemons.map(pokemon => pokemon.dataValues);
        
        res.render('index', {
            title: 'POKEDEX',
            activeHome: true,
            pokemons: pk
        })
    }).catch(err => console.log(err));
}