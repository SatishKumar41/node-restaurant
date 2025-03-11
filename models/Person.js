const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number    
      },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },   
    mobile:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
   salary: {
    type: Number,
    required: true  
  },
  username: {
    type: String,
    required: true  
  },
  password: {
    type: String,
    required: true  
  }


})
  personSchema.pre('save', async function(next){
    const person =this;
    //hash the password only if it has modified (or its new)
    if(!person.isModified('password')) return next();
    try {
        //salt generation
        const salt = await bcrypt.genSalt(5);
        //has password
        const hashPassword = await bcrypt.password(person.password,salt);
        //override the plain password
        person.password = hashPassword;
        next();

    } catch (err) {
        return next(err);
    }
  })

const Person =mongoose.model('Person',personSchema);
module.exports = Person;