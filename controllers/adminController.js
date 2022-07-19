const { send } = require('process');
const typesTable = require('../models/typesT');
const pkTable = require('../models/pokemonsT');
const rgTable = require('../models/regionsT');

exports.GetPokemonsM = (req,res,next)=>{
    res.render('./admin/pokemonsM',{
        title: 'Pokemons',
        activePokemons: true,
    });
}

exports.GetRegionsM = (req,res,next)=>{
    res.render('./admin/regionsM',{
        title: 'Regions',
        activeRegions: true,
    })
}


//----------------------------typesM
exports.GetTypesM = (req,res,next)=>{

    typesTable.typesT.findAll().then(t => {

        const tm = t.map(t => t.dataValues);

        res.render('./admin/typesM',{
            title: 'Types',
            activeTypes: true,
            typesData: tm,
        })

    }).catch(err=>console.log(err));

}
exports.PostTypesM = (req,res,next)=>{
    typesTable.typesT.create({typeName: req.body.typeName}).then(()=>res.status(200).redirect("/admin/typesM")).catch(err=>console.log(err));

}

//----------------------------edit
exports.GetEdit = (req,res,next)=>{

    const id = req.params.id;
    const active = req.params.active;

    if(active === "typesM"){
        typesTable.typesT.findOne({where: {id: id}}).then(type => {
            const tm = type.dataValues;
            res.render('edit',{
                title: 'Types edit',
                name: 'types',
                activeEditTypes: true,
                tm,
                active: active,
            });
        }).catch(err=>console.log(err));
    }
}
exports.PostEdit = (req,res,next)=>{
    const active = req.params.active;
    const typeName = req.body.typeName;
    const id = req.body.id;

    if(active === "typesM"){
        typesTable.typesT.update({typeName: req.body.typeName},{where: {id: id}}).then(()=>res.status(200).redirect("/admin/typesM")).catch(err=>console.log(err));
    }
}