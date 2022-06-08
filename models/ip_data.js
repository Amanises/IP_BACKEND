const mongoose = require('mongoose') ; 

const add_req_schema = new mongoose.Schema({
    add_req_sldc : {
        sldc_user : {
            type : String,
        },
        date : {
            type : Date,
            default : ()=> Date.now(),
        },
    },
    apprv_req_cert_go : {
        cert_go_user : {
            type : String,
            default : null,
        },
        date : {
            type : Date,
            default : null,
        },
    },
    apprv_req_csk : {
        csk_user : {
            type : String,
            default : null,
        },
        date : {
            type : Date,
            default : null,
        },
    }
})

const del_req_schema = new mongoose.Schema({
    del_req_sldc : {
        sldc_user : {
            type : String,
            default : null,
        },
        date : {
            type : Date,
            default : ()=> Date.now(),
        },
    },
    apprv_req_cert_go : {
        cert_go_user : {
            type : String,
            default : null,
        },
        date : {
            type : Date,
            default : null,
        },
    },
    apprv_req_csk : {
        csk_user : {
            type : String,
            default : null,
        },
        date : {
            type : Date,
            default : null,
        },
    }
})

const ip_schema = new mongoose.Schema(
    {
        ip : {
            type : String,
            default : null,
        },
        sldc : {
            type : String,
            default : null,
        },
        add_req : add_req_schema,
        del_req : del_req_schema,
        stage : {
            type : Number,
            default : null,
        },
    }
)


module.exports = mongoose.model('ip_db',ip_schema);