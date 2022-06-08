const express = require('express') ; 

const router = express.Router();

const ip_data_schema = require('../models/ip_data'); // fetch ip_data schema

// actually here nothing will be deleted. there is no need. In the end we need all the logs to be stored.
// reaching stage 6 will mean being deleted.
// We will only update stage 4,5,6 using user name, id, stage input.

//stage 4
router.delete('/sldc', async (req,res) =>{
    const timestamp = Date.now();
    data = await ip_data_schema.updateOne({"_id":req.body.id},{$set : {'del_req.del_req_sldc.sldc_user':req.body.user,'del_req.del_req_sldc.date':timestamp,'stage':req.body.stage}})
    res.json(data);
})

//stage 5
router.delete('/cert', async (req,res) =>{
    const timestamp = Date.now();
    data = await ip_data_schema.updateOne({"_id":req.body.id},{$set : {'del_req.apprv_req_cert_go.cert_go_user':req.body.user,'del_req.apprv_req_cert_go.date':timestamp,'stage':req.body.stage}})
    res.json(data);
})

//stage 6, [FINAL]
router.delete('/csk', async (req,res) =>{
    const timestamp = Date.now();
    data = await ip_data_schema.updateOne({"_id":req.body.id},{$set : {'del_req.apprv_req_csk.csk_user':req.body.user,'del_req.apprv_req_csk.date':timestamp,'stage':req.body.stage}})
    res.json(data);
})

module.exports = router ;