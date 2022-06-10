const express = require('express') ; 
const mongoose = require('mongoose') ; 
const dotenv = require('dotenv') ; 
const cors = require('cors') ; 
const post_urls = require('./routes/post') ;
const put_urls = require('./routes/put') ;
const delete_urls = require('./routes/delete') ;
const get_urls = require('./routes/get');
const bcrypt = require ('bcrypt');
const {MongoClient} = require('mongodb');

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

// use "npm run devStart" to run server.js with nodemon

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb://10.5.134.28:27017/SLDCCybersecuritydashboard";
 

//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// FROM Documentations of npm mongodb
const url_local = 'mongodb://localhost:27017';
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
const find_user = {username:'PB-SLDC'};
// const a = main(find_user)
// .then(data => {return data})
// .catch(console.error)
// .finally(()=>client.close())



app.get('/',(req,res) => {
    res.send('Hello world!')
})

app.get('/test',async (req,res) => {
    // res.send('Hello world testing!')
    const a = await main(find_user)
.then(data => {return data})
.catch(console.error)
.finally(()=>client.close())
res.send(a)
})


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})
