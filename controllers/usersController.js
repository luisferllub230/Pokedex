const pkTable = require('../models/pokemonsT');
const ttTable = require('../models/typesT');
const rgTable = require('../models/regionsT');
const {Op} = require('sequelize');


exports.GetHome = (req, res, next) => {
    pkTable.pokemonsT.findAll({include: [{model: ttTable.typesT}, {model: rgTable.regionsT}]}).then(pokemons => {

        rgTable.regionsT.findAll().then(types => {

            const rg = types.map(t => t.dataValues);
            const pk = pokemons.map(pokemon => pokemon.dataValues);

            res.render('index', {
                title: 'POKEDEX',
                activeHome: true,
                pokemons: pk,
                regions: rg,
            })

        }).catch(err => {});
    }).catch(err => console.log(err));
}

exports.PostHome = (req, res, next) => {

    
    pkTable.pokemonsT.findAll({
        include: [{model: ttTable.typesT}, {model: rgTable.regionsT}],
        where: {
            [Op.or]: [
                {regionsTId: req.body.inputID}
            ]
        }
    }).then(pokemons => {
            
        rgTable.regionsT.findAll().then(types => {
    
            const rg = types.map(t => t.dataValues);
            const pk = pokemons.map(pokemon => pokemon.dataValues);

            console.log(req.body.inputID);
            console.log(pk);
    
            res.render('index', {
                title: 'POKEDEX',
                activeHome: true,
                pokemons: pk,
                regions: rg,
            })
    
        }).catch(err => {});
    }).catch(err => console.log(err));
}