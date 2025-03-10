const mongoose = require('mongoose');
require('dotenv').config();

const dbURL = process.env.MONGODB_URL;
//const db = mongoose.connect('mongodb://localhost:27017/mydatabase')
const db =mongoose.connect(dbURL);

db.then(() => {
console.log('Connected to MongoDB Server');
}).catch(err => {
console.error('Error connecting to MongoDB Server', err);
});


//Export a database Connection

module.export = db;


 