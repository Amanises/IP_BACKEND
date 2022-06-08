const express = require('express') ; 

const router = express.Router();

const ip_data_schema = require('../models/ip_data'); // fetch ip_data schema




router.post('/test',(req,res) => {
    // res.send('In update route: ip '+req.body.ip+' by user '+req.body.add_req.user);
    res.send('inside post home url')
})

router.post('/new',(req,res)=>{
    const newToken = new ip_data_schema({
        ip:req.body.ip,
        sldc: req.body.sldc,
        // stage : req.body.stage,
        stage : 1,
        add_req : {
            add_req_sldc : {
                sldc_user : req.body.user,
            },
        },
        
    });
    newToken.save()
    .then(data => {
        res.send(data._id)
    })
    .catch(error => {
        res.json(error)
    })
})

router.post('/dummy', (req,res)=>{
    const timestamp = Date.now();
    const token = new ip_data_schema({
        ip : req.body.ip,
        sldc : req.body.sldc,
        add_req : {
            add_req_sldc : {
                sldc_user : req.body.add_sldc,
            },
            apprv_req_cert_go : {
                cert_go_user : req.body.add_cert,
                date : timestamp,
            },
            apprv_req_csk : {
                csk_user : req.body.add_csk,
                date : timestamp,
            }
        },
        del_req : {
            del_req_sldc : {
                sldc_user : req.body.del_sldc,
                date : timestamp,
            },
            apprv_req_cert_go : {
                cert_go_user : req.body.del_cert,
                date : timestamp,
            },
            apprv_req_csk : {
                csk_user : req.body.del_csk,
                date : timestamp,
            }
        },
        stage : req.body.stage,
    })
    token.save()
    .then(data =>{
        res.send(data);
    })
    .catch(error => {
        res.json(error)
    })
})

router.post('/active',async (req,res) =>{
    const sldc = req.body.sldc;
    data = await ip_data_schema.find({stage:3,sldc:sldc});
    // console.log(sldc);
    res.json(data);
})

// get the particualr sldc's all ip history.
router.post('/sldc_all',async (req,res) =>{
    const sldc = req.body.sldc;
    data = await ip_data_schema.find({sldc:sldc})
    res.json(data);
})

module.exports = router ;