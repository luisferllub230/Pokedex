const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/errors');

// Create a new express application instance
const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine("hbs", expressHbs.engine({
    layoutDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use("/admin/",adminRoutes);
app.use("/",userRoutes);
app.use("/",errorRoutes);

//launch the server
app.listen(5500);