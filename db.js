const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/mydatabase')

db.then(() => {
console.log('Connected to MongoDB Server');
}).catch(err => {
console.error('Error connecting to MongoDB Server', err);
});


//Export a database Connection

module.export = db;


 