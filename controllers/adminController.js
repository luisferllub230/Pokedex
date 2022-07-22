const tpTable = require('../models/typesT');
const pkTable = require('../models/pokemonsT');
const rgTable = require('../models/regionsT');

let listTp = [];
let listRg = [];

//----------------------------pokemonsM
exports.GetPokemonsM = (req, res, next) => {
    pkTable.pokemonsT.findAll({ include: [{ model: tpTable.typesT }, { model: rgTable.regionsT }]}).then(p =>{

        tpTable.typesT.findAll({attributes: ['id','typeName']}).then(t=>{
            t.map(t=>listTp.push(t.dataValues))
        
            rgTable.regionsT.findAll({attributes: ['id','regionName']}).then(r=>{ 
                r.map(r=>listRg.push(r.dataValues))

                const pm = p.map(p => p.dataValues);
                let compotation = true;

                if(listRg.length === 0 || listTp.length === 0){compotation = false }

                res.render('./admin/pokemonsM', {
                    title: 'Pokemons',
                    activePokemons: true,
                    pokemonData: pm,
                    listTp,
                    listRg,
                    compotation
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

    listRg = [];
    listTp = [];
}
exports.PostpokemonsM = (req, res, next) => {
    pkTable.pokemonsT.create({ pokemonName: req.body.name, image: req.body.image, typesTId: req.body.types, regionsTId: req.body.regions }).then(() => res.status(200).redirect("/admin/pokemonsM")).catch(err => console.log(err));
}

//----------------------------GetRegionsM
exports.GetRegionsM = (req, res, next) => {
    rgTable.regionsT.findAll().then(r => {
        const rm = r.map(r => r.dataValues);
        res.render('./admin/regionsM', {
            title: 'Regions',
            activeRegions: true,
            regionData: rm,
        })
    }).catch(err => console.log(err));
}
exports.PostRegionsM = (req, res, next) => {
    rgTable.regionsT.create({ regionName: req.body.regionName }).then(() => res.status(200).redirect("/admin/regionsM")).catch(err => console.log(err));
}

//----------------------------typesM
exports.GetTypesM = (req, res, next) => {
    tpTable.typesT.findAll().then(t => {
        const tm = t.map(t => t.dataValues);
        res.render('./admin/typesM', {
            title: 'Types',
            activeTypes: true,
            typesData: tm,
        })
    }).catch(err => console.log(err));
}
exports.PostTypesM = (req, res, next) => {
    tpTable.typesT.create({ typeName: req.body.typeName }).then(() => res.status(200).redirect("/admin/typesM")).catch(err => console.log(err));
}

//----------------------------edit
exports.GetEdit = (req, res, next) => {
    const id = req.params.id;
    const active = req.params.active;

    if (active === "typesM") {
        tpTable.typesT.findOne({ where: { id: id } }).then(type => {
            const tm = type.dataValues;
            res.render('edit', {
                title: 'Types edit',
                name: 'types',
                activeEditTypes: true,
                tm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "regionsM") {
        rgTable.regionsT.findOne({ where: { id: id } }).then(region => {
            const rm = region.dataValues;
            res.render('edit', {
                title: 'Regions edit',
                name: 'regions',
                activeEditRegions: true,
                rm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "pokemonsM") {
        pkTable.pokemonsT.findOne({where: { id: id }}).then(pokemon => {
                const pm = pokemon.dataValues;
                res.render('edit', {
                    title: 'Pokemons edit',
                    name: 'pokemons',
                    activeEditPokemons: true,
                    pm,
                    active,
                    listTp,
                    listRg
                });
        }).catch(err => console.log(err));
    }
}
exports.PostEdit = (req, res, next) => {
    const active = req.params.active;
    const id = req.body.id;

    if (active === "typesM") {
        tpTable.typesT.update({ typeName: req.body.typeName }, { where: { id: id } }).then(() => res.status(200).redirect("/admin/typesM")).catch(err => console.log(err));
    }
    if (active === "regionsM") {
        rgTable.regionsT.update({ regionName: req.body.regionName }, { where: { id: id } }).then(() => res.status(200).redirect("/admin/regionsM")).catch(err => console.log(err));
    }
    if (active === "pokemonsM") {
        pkTable.pokemonsT.update({ pokemonName: req.body.name, image: req.body.image, typesTId: req.body.types, regionsTId: req.body.regions }, { where: { id: id } }).then(() => res.status(200).redirect("/admin/pokemonsM")).catch(err => console.log(err));
    }
}

//----------------------------delete
exports.GetDelete = (req, res, next) => {
    const id = req.params.id;
    const active = req.params.active;

    if (active === "typesM") {
        tpTable.typesT.findOne({ where: { id: id } }).then(type => {
            const tm = type.dataValues;
            res.render('delete', {
                title: 'Types delete',
                name: 'delete',
                activeDeleteTypes: true,
                tm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "regionsM") {
        rgTable.regionsT.findOne({ where: { id: id } }).then(region => {
            const rm = region.dataValues;
            res.render('delete', {
                title: 'Regions delete',
                name: 'delete',
                activeDeleteRegions: true,
                rm,
                active
            });
        }).catch(err => console.log(err));
    }
    if (active === "pokemonsM") {
        pkTable.pokemonsT.findOne({ where: { id: id } }).then(pokemon => {
            const pm = pokemon.dataValues;
            res.render('delete', {
                title: 'Pokemons delete',
                name: 'delete',
                activeDeletePokemons: true,
                pm,
                active
            });
        }).catch(err => console.log(err));
    }
}
exports.PostDelete = (req, res, next) => {
    const active = req.params.active;
    const id = req.body.id;

    if (active === "typesM") {
        tpTable.typesT.destroy({ where: { id: id } }).then(() => res.status(200).redirect("/admin/typesM")).catch(err => console.log(err));
    }
    if (active === "regionsM") {
        rgTable.regionsT.destroy({ where: { id: id } }).then(() => res.status(200).redirect("/admin/regionsM")).catch(err => console.log(err));
    }
    if (active === "pokemonsM") {
        pkTable.pokemonsT.destroy({ where: { id: id } }).then(() => res.status(200).redirect("/admin/pokemonsM")).catch(err => console.log(err));
    }
}