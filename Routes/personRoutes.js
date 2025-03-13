const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} =require('./../jwt');

     router.post('/signup', async(req, res)=>{

            try {
                const data = req.body;
                const newPerson = new Person(data);
                const response = await newPerson.save();
                console.log('Data saved',response);

                const payload = {
                    id:response.id,
                    username:response.username
                }
                const token = generateToken(payload);
                    console.log("Token is : ", token);
                    res.status(200).json({response:response, token :token});
                
            } catch (err) {
                    console.log(err);
                    res.status(500).json({error: 'Internal Server Error'});
            }
        });

    //login Route
    router.post('/login', async(req, res)=>{
            try {
                // Extract user details 
                const {username, password} = req.body; 
                
                //find user in database
                const user = await Person.findOne({username: username});
                const Cpass =await user.comparePassword(password); //console.log(pass);
                if (!user || !Cpass) return res.status(401).json({error: "Invalid username or password"});
                //generate token
                const payload={
                    id: user.id,
                    username: user.username
                }
                const token = generateToken(payload);
                res.json(token);
                
            } catch (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
            }

        });

    //Profile Route
    router.get('/profile', jwtAuthMiddleware, async(req, res)=>{

        try {
            const userdata = req.user;
            const userId = userdata.id;
            const user = await Person.findById(userId);
            res.status(200).json({user});
        } catch (err) {
            console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
        }
        });

    //person Route
    router.get('/', jwtAuthMiddleware, async(req, res)=>{
            try {
                const data = await Person.find();
                console.log('data feteched');
                res.status(200).json(data);

            } catch(err) {
                console.log(err);
                res.status(500).json({error: 'Internal Server Error'});
            }
        })

    router.get('/:workType', async(req, res)=>{
            try {
                const workType = req.params.workType;
                    if(workType =='chef' || workType =='manager'|| workType == 'waiter'){
                        const data = await Person.find({work: workType});
                        console.log('data feteched');
                        res.status(200).json(data);
                    }
                    else{
                        console.log(err);
                        res.status(500).json({error: 'Invalid work type'});
                    }


            } catch(err) {
                console.log(err);
                res.status(500).json({error: 'Invalid work type'});
            }
        })

    //update person
    router.put('/:id', async(req, res)=>{
            try {
                const personID = req.params.id;
                const updatedData =req.body;
                const response = await Person.findByIdAndUpdate(personID, updatedData, {
                new: true,
                runvalidators: true

                });
                if(!response){res.status(404).json({error: 'person not found'});}

                console.log('Data updated',response);
                res.status(200).json(response);
                
            } catch (err) {
                    console.log(err);
                    res.status(500).json({error: 'Internal Server Error'});
            }
        })

     //Delete person
    router.delete('/:id', async(req, res)=>{
            try {
                const personID = req.params.id;
                const response = await Person.findByIdAndDelete(personID);

                if(!response){
                    res.status(404).json({error: 'Record not found'});
                    
                }
            
                console.log('Data deleted');
                res.status(200).json({message: "person deleted sucessfully"});
                
            } catch (err) {
                    console.log(err);
                    res.status(500).json({error: 'Internal Server Error'});
            }
        })

    module.exports= router;
