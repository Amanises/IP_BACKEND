const express = require('express') ; 
const mongoose = require('mongoose') ; 
const dotenv = require('dotenv') ; 
const cors = require('cors') ; 
const post_urls = require('./routes/post') ;
const put_urls = require('./routes/put') ;
const delete_urls = require('./routes/delete') ;
const get_urls = require('./routes/get');

dotenv.config() ; // activate the dot env settings

//connect to mongoose data base
mongoose.connect(process.env.DATABASE,() => {console.log("Database connected")}, e => console.error(e)) ;

const port = process.env.PORT || 5000 ; 

const app = express() ; 

// express middlewares
app.use(express.json()) ;       // same effect as body parser. Deals with all data in json format.
app.use(cors({origin:true})) ;   // allows cross site scripting. Usefull in local development and testing.
app.use('/post',post_urls) ; 
app.use('/put',put_urls) ;
app.use('/del',delete_urls) ;
app.use('/get',get_urls) ;

// use "npm run start" to run server.js with nodemon





app.get('/',(req,res) => {
    res.send('Hello world!')
})

app.get('/test',(req,res) => {
    res.send('Hello world testing!')
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})
