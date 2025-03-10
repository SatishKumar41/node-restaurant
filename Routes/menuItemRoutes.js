const express = require('express');
const router =express.Router();

const MenuItem  = require('../models/Menu');


router.post('/', async(req, res)=>{

    try {
        const data = req.body;
        console.log(data);
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data saved',response);
        res.status(200).json(response);
        
    } catch (err) {
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/', async(req, res)=>{
    try {
        const data = await MenuItem.find();
        console.log('data feteched');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/:taste', async(req, res)=>{
    try {
           const taste = req.params.taste;
            if(taste =='spicy' || taste =='sweet'|| taste == 'sour'){
                const data = await MenuItem.find({taste: taste});
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


//update menu

router.put('/:id', async(req, res)=>{
    try {
        const menuID = req.params.id;
        const updatedData =req.body;
        const response = await MenuItem.findByIdAndUpdate(menuID, updatedData, {
           new: true,
           runvalidators: true

        });
        if(!response){res.status(404).json({error: 'Menu not found'});}

        console.log('Menu updated',response);
        res.status(200).json(response);
        
    } catch (err) {
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
    }
})

//Delete person

router.delete('/:id', async(req, res)=>{
    try {
        const menuID = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuID);

        if(!response){
            res.status(404).json({error: 'Record not found'});
           }
     
        console.log('Menu deleted');
        res.status(200).json({message: "Menu deleted sucessfully"});
        
    } catch (err) {
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;