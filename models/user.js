const mongoose = require('mongoose') ; 

const user_schema = new mongoose.Schema({
    user : {
        type : String,
        default : null,
    },
    role : {
        type : String,
        default : null,
    },
    sldc : {
        type : String,
        default : null,
    },
    pass : {
        type : String,
        default : null,
    },
})

module.exports = mongoose.model('user',user_schema);