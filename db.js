const mongoose = require('mongoose');
require('dotenv').config();

const mongodbURL = process.env.MONGODB_URL;
//const dbURLLOCAL = process.env.MONGODB_URL;
//const db = mongoose.connect(dbURLLOCAL)
mongoose.connect(mongodbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db =mongoose.connection;

db.on('connected', ()=>{console.log('Connected to MongoDB Server')})
db.on('error', (err)=>{console.error('Error connecting to MongoDB Server', err)})
db.on('disconnected', ()=>{console.log('Disconnected from MongoDB Server')})


//Export a database Connection

module.export = db;


 