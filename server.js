const express = require('express');
const app = express();
const db  =  require('./db');
require('dotenv').config();
const passport =require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Middleware function
const logRequest =(req, res, next)=>{
    console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

//Auth. function
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

// import the router files
const personRoutes = require('./Routes/personRoutes');
const menuItem = require('./Routes/menuItemRoutes');

//use the routers
app.use('/person' , personRoutes);
app.use('/menu', menuItem);


app.get('/', function(req, res){
    res.send("Welcome to My Hotel ");
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{console.log('listening on port 3001')});