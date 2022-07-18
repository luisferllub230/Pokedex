const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Create a new express application instance
const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', expressHbs({ 
    defaultLayout: 'main-layout',
    layoutsDir: 'views/layouts/',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//launch the server
app.listen(5500);