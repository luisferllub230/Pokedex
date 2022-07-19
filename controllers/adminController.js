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

exports.GetTypesM = (req,res,next)=>{
    res.render('./admin/typesM',{
        title: 'Types',
        activeTypes: true,
    })
}