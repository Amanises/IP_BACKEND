const express = require('express') ; 

const router = express.Router();

const ip_data_schema = require('../models/ip_data'); // fetch ip_data schema
const user_schema = require('../models/user') // fetch user schema



router.put('/cert',async (req,res) => {
    // res.send('inside the cert route')
    // _id: '628d7add43d4e2110c8c5050'
    // in req there will be cert-go user,stage,id of object to be updated
    // to validate the entered data use save method. in updateOne method the validation is not there.
    const timestamp =  Date.now();
    data = await ip_data_schema.updateOne({"_id":req.body.id},{$set : {'add_req.apprv_req_cert_go.cert_go_user' : req.body.user,'add_req.apprv_req_cert_go.date' : timestamp,'stage':req.body.stage}})
    res.json(data);
})

// used to approve add request by cert-go
// req input : array of ID's, CERT user.
router.put('/cert_add_apprv', async (req,res) =>{
    const timestamp = Date.now();
    let id_array = req.body.id_array;
    let rej_array = req.body.rej_array;
    // here id is string elements of id_array containing string array of id's to update.
    for (const id of id_array){
        data = await ip_data_schema.updateOne({"_id":id},{$set : {'add_req.apprv_req_cert_go.cert_go_user' : req.body.user,'add_req.apprv_req_cert_go.date' : timestamp,'stage':2}})
    }
    for (const id of rej_array){
        data = await ip_data_schema.updateOne({"_id":id},{$set : {'add_req.apprv_req_cert_go.cert_go_user' : req.body.user,'add_req.apprv_req_cert_go.date' : timestamp,'stage':7}})
    }
    //stage 7 is for reject IP by cert
})

// used to approve add request by csk
// req input : array of ID's , CSK user.
router.put('/csk_add_apprv', async (req,res) =>{
    const timestamp = Date.now();
    let id_array = req.body.id_array;
    // here id is string elements of id_array containing string array of id's to update.
    for (const id of id_array){
        data = await ip_data_schema.updateOne({"_id":id},{$set : {'add_req.apprv_req_csk.csk_user' : req.body.user,'add_req.apprv_req_csk.date' : timestamp,'stage':3}})
    }
})

router.put('/sldc_del_req',async (req,res) =>{
    const timestamp = Date.now();
    let id_array = req.body.id_array;
    // here id is string elements of id_array containing string array of id's to update.
    for (const id of id_array){
        data = await ip_data_schema.updateOne({"_id":id},{$set : {'del_req.del_req_sldc.sldc_user' : req.body.user,'del_req.del_req_sldc.date' : timestamp,'stage':4}})
    }
    
})

router.put('/cert_del_apprv', async (req,res) =>{
    const timestamp = Date.now();
    let id_array = req.body.id_array;
    let rej_array = req.body.rej_array;
    // here id is string elements of id_array containing string array of id's to update.
    for (const id of id_array){
        data = await ip_data_schema.updateOne({"_id":id},{$set : {'del_req.apprv_req_cert_go.cert_go_user' : req.body.user,'del_req.apprv_req_cert_go.date' : timestamp,'stage':5}})
    }
    for (const id of rej_array){
        data = await ip_data_schema.updateOne({"_id":id},{$set : {'del_req.apprv_req_cert_go.cert_go_user' : req.body.user,'del_req.apprv_req_cert_go.date' : timestamp,'stage':8}})
    }
    // stage 8 Delete request of SLDC rejected by CERT.
})

router.put('/csk_del_apprv', async (req,res) =>{
    const timestamp = Date.now();
    let id_array = req.body.id_array;
    // here id is string elements of id_array containing string array of id's to update.
    for (const id of id_array){
        data = await ip_data_schema.updateOne({"_id":id},{$set : {'del_req.apprv_req_csk.csk_user' : req.body.user,'del_req.apprv_req_csk.date' : timestamp,'stage':6}})
    }
})



//this is the way.
router.put('/csk', async (req,res) => {
    const timestamp = Date.now();
    data = await ip_data_schema.updateOne({"_id":req.body.id},{$set : {'add_req.apprv_req_csk.csk_user':req.body.user,'add_req.apprv_req_csk.date':timestamp,'stage':req.body.stage}})
    res.json(data);
})

router.put('/test',(req,res) => {
    res.send('put testing');
})



module.exports = router ;



// don't use this type of updation when there are multiple branch objects and you are updating
// one branch. This resets all other branch values of parent.
// router.put('/csk2',async (req,res) => {
//     const timestamp = Date.now();
//     data = await ip_data_schema.updateOne({"_id":req.body.id},{$set : {
//         add_req : {
//                 apprv_req_csk : {
//                                     csk_user : req.body.user,
//                                     date : timestamp,
//                                     },
//                     },
//         stage : req.body.stage
//         }})
//     res.json(data);

// })