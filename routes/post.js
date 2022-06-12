const express = require('express');
const router = express.Router();

const ip_data_schema = require('../models/ip_data'); // fetch ip_data schema
// const user = require('../models/user');
const user_schema = require('../models/user')

const bcrypt = require('bcrypt');

// import for client usage mongodb ----------------------------------------------------------------------------
const {MongoClient} = require('mongodb');

const url_local = 'mongodb://localhost:27017';  // change this to db url of database in posoco server.
// const url_local = 'mongodb://10.5.134.28:27017/'
// const url_local = 'mongodb+srv://admin:admin@cluster0.rgwtd.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url_local);
const dbname = 'SLDCCybersecuritydashboard'; //this is our database name

async function main(prop){
    await client.connect();
    console.log('Connected as a client to server');
    const db = client.db(dbname);
    const collection = db.collection('users'); // the collection name
    
    // type your code here
    const filter = await collection.find(prop).toArray();
    // console.log(filter);
    
    return filter;
}

// import finished -----------------------------------------------------------------------------------

// here is auth api. takes (username and password) returns (role) [in frontend route on basis of roles. that's it]

router.post('/auth', async (req, res) => {

    const find_user = { username: req.body.user };
    const plain_pass = req.body.pass;
    const a = await main(find_user)
        .then(data => { return data })
        .catch(console.error)
        .finally(() => client.close())

    // console.log(a.length)
    if(a.length == 1){
        const obj = a[0];
        // console.log(obj);
        const hashpass = obj.password;
        // console.log(hashpass);
        // console.log(plain_pass);
        bcrypt.compare(plain_pass, hashpass, function (err, result) {
            // result == true
            // console.log(result);
            if(result==true){
                const to_return = {auth:'true',role:obj.role}
                res.json(to_return);
            }
            else {
                const to_return = {auth:'false'}
                res.json(to_return);
            }
        });
    }
    else{
        const to_return = {auth:'false'}
        res.json(to_return)
    }
    // res.send(a)
})

router.post('/test', async (req, res) => {
    // res.send('In update route: ip '+req.body.ip+' by user '+req.body.add_req.user);
    // res.send('inside post home url')
    const find_user = { username: 'PB-SLDC' };
    const a = await main(find_user)
        .then(data => { return data })
        .catch(console.error)
        .finally(() => client.close())

    console.log(a.length)
    res.send(a)
})

router.post('/new', (req, res) => {
    const newToken = new ip_data_schema({
        ip: req.body.ip,
        sldc: req.body.sldc,
        // stage : req.body.stage,
        stage: 1,
        add_req: {
            add_req_sldc: {
                sldc_user: req.body.user,
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

router.post('/dummy', (req, res) => {
    const timestamp = Date.now();
    const token = new ip_data_schema({
        ip: req.body.ip,
        sldc: req.body.sldc,
        add_req: {
            add_req_sldc: {
                sldc_user: req.body.add_sldc,
            },
            apprv_req_cert_go: {
                cert_go_user: req.body.add_cert,
                date: timestamp,
            },
            apprv_req_csk: {
                csk_user: req.body.add_csk,
                date: timestamp,
            }
        },
        del_req: {
            del_req_sldc: {
                sldc_user: req.body.del_sldc,
                date: timestamp,
            },
            apprv_req_cert_go: {
                cert_go_user: req.body.del_cert,
                date: timestamp,
            },
            apprv_req_csk: {
                csk_user: req.body.del_csk,
                date: timestamp,
            }
        },
        stage: req.body.stage,
    })
    token.save()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.json(error)
        })
})

router.post('/active', async (req, res) => {
    const sldc = req.body.sldc;
    data = await ip_data_schema.find({ stage: 3, sldc: sldc });
    // console.log(sldc);
    res.json(data);
})

// get the particualr sldc's all ip history.
router.post('/sldc_all', async (req, res) => {
    const sldc = req.body.sldc;
    data = await ip_data_schema.find({ sldc: sldc })
    res.json(data);
})


// input user and password
router.post('/user', async (req, res) => {

    const user = new user_schema({
        user: req.body.user,
        role: req.body.role,
        sldc: req.body.sldc,
        pass: req.body.pass,
    })
    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.json(error)
        })
})

// send user and hash password for authentication.
router.post('/auth2', async (req, res) => {

    const user = await user_schema.findOne({ user: req.body.user });

    if (user) {
        const ret = { user: user.user, role: user.role, sldc: user.sldc }
        if (user.pass == req.body.pass) {
            res.json(ret)
        }
        else res.send("ERROR")
    }
    else {
        res.send('USER NOT FOUND')
    }

    // res.json(user);
})

router.post('/hash', async (req, res) => {
    const pass = req.body.pass;
    const salt = await bcrypt.genSalt(10);
    const salt2 = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    const hash2 = await bcrypt.hash(pass, salt2);

    // console.log(hash);
    // console.log(hash2);
    console.log(pass);
    const plain = "certGO@1sldcPortal";
    const hash_pass = "$2b$10$N.U4xHKO.HqVu1rAUZ7pRO3zREoTk1gg/qIZMJPLKwSa3Gktd/b7K";
    bcrypt.compare(plain, hash_pass, function (err, result) {
        // result == true
        console.log(result);
        res.send(result)
    });

    // res.send(hash)
})

module.exports = router;