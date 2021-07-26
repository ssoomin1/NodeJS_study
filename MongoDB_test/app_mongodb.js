const express=require('express');
const MongoClient = require('mongodb').MongoClient;
//mongoclient객체를 생성함(mongoclient는 접속할 db주소와 db이름이 필요함)
const url = "mongodb://localhost:27017";
const dbname="data";

const app = express();

app.use(express.urlencoded({extended:true}));
//mongodb연결
let db;
MongoClient.connect(url,(err,client)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Connected mongodb');
        db=client.db(dbname);
        login = db.collection('login');
        console.log('created!!');
    }
})

app.get('/',(req,res)=>{
    res.send('hi');
})

app.listen(3000,()=>{
    console.log('Server Running at localhost...');
})