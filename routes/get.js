const express = require('express') ; 

const router = express.Router();
const ip_data_schema = require('../models/ip_data'); // fetch ip_data schema




router.get('/test',(req,res) => {
    // res.send('In update route: ip '+req.body.ip+' by user '+req.body.add_req.user);
    res.send('inside get home url')
})

router.get('/all',async (req,res) => {
    data = await ip_data_schema.find({});
    res.json(data);
})

router.get('/cert_aprv',async (req,res) => {
    data = await ip_data_schema.find({stage : 1});
    res.json(data);
})

router.get('/csk_apprv',async (req,res) =>{
    data = await ip_data_schema.find({stage:2});
    res.json(data);
})

router.get('/active',async (req,res) =>{
    const sldc = req.body.sldc;
    data = await ip_data_schema.find({stage:3,sldc:sldc});
    // console.log(sldc);
    res.json(data);
})

router.get('/cert_del_req',async (req,res) =>{
    data = await ip_data_schema.find({stage:4});
    res.json(data);
})

router.get('/csk_del_req',async (req,res) =>{
    data = await ip_data_schema.find({stage:5});
    res.json(data);
})

router.get('/log',async (req,res) =>{
    data = await ip_data_schema.find({stage:6});
    res.json(data);
})

module.exports = router ;