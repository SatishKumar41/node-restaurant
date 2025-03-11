const mongoose = require('mongoose');
require('dotenv').config();

//const dbURL = process.env.MONGODB_URL;
const dbUrlLocal = process.env.MONGODB_URL_LOCAL;
//const db = mongoose.connect(dbURLLOCAL)
const db =mongoose.connect('mongodb://localhost:27017/mydatabase');
//console.log(db);
db.then(() => {
console.log('Connected to MongoDB Server');
}).catch(err => {
console.error('Error connecting to MongoDB Server', err);
});

module.exports= db;


 