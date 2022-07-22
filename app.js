const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/errors');
const helpersHbs = require('./helpers/hbs');

//import models
const db = require('./database/db');
const tt = require('./models/typesT');
const rt = require('./models/regionsT');
const pk = require('./models/pokemonsT');

// Create a new express application instance
const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handlebars
app.engine("hbs", expressHbs.engine({
    layoutDir: "view/layout",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
        equal: helpersHbs.comparative,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));

// Set the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin/",adminRoutes);
app.use("/",userRoutes);
app.use("/",errorRoutes);

pk.pokemonsT.belongsTo(tt.typesT,{
    foreignKey: 'typesTId',
    constraints: true,
    onDelete: 'CASCADE',
});
tt.typesT.hasMany(pk.pokemonsT,{
    foreignKey: 'typesTId',
    target_key: 'id',
});

pk.pokemonsT.belongsTo(rt.regionsT,{
    constraints: true,
    onDelete: 'CASCADE',
});
rt.regionsT.hasMany(pk.pokemonsT,{});

//launch the server
db.sql.sync({}).then(()=>app.listen(process.env.port || 5500)).catch(err => console.log(err));