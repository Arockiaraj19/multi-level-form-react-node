const express=require("express");
const bodyParser = require('body-parser');
const mongodb=require("mongodb").MongoClient;
const cors = require('cors')
const morgan = require('morgan')




const app = express();
const url = 'mongodb://localhost:27017/';
app.use(cors("Access-Control-Allow-Origin: *"));
app.use(morgan("combined"));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));


 mongodb.connect(url ,{ useUnifiedTopology: true },(err, result)=>{
  if(err) throw error;

  const db=result.db('admin');
   user=db.collection('job_details');
   app.locals.users=user;

});
 
app.post('/', (req,res)=>{
  console.log(req.body);
 const user=req.app.locals.users;
 user.insertOne(req.body,(err,result)=>{
   if(err) throw err;
   res.json(req.body);
 })

});
app.get('/details', (req,res)=>{
  const user=req.app.locals.users;
  user.find({}).toArray((err,result)=>{
    if(err){
      throw err;
    }else{
      res.json(result);
    }
  })
});
  app.listen(5000,()=>console.log("server connected"))