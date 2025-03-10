const express = require('express');
const app = express();
const db  =  require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import the router files
const personRoutes = require('./Routes/personRoutes');
const menuItem = require('./Routes/menuItemRoutes');
//use the routers
app.use('/person', personRoutes);

app.use('/menu', menuItem);


app.get('/', function(req, res){
    res.send("Welcome to My Hotels... ");
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{console.log('listening on port 3001')});