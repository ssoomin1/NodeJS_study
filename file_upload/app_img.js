const express=require('express');
var multer  = require('multer')
var fs=require('fs');
var mysql=require('mysql');

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
    cb(null, 'public/uploads/images')
        },
  
    filename: function (req, file, cb) {
    //cb(null, file.originalname+'_'+Date.now())
      cb(null, file.originalname)
    }
    
    })
    
    var upload = multer({ storage: _storage })

    var conn = mysql.createConnection({
        host     : 'localhost',
        user     : 'test',
        password : '1111',
        database : 'testdb',
      });

const app=express();

app.use(express.static('public'));

app.set('views','./views');
app.set('view engine','ejs');

app.get("/",(req, res)=>{
    res.render("img_index");
})

app.get("/fupload",(req, res)=>{
    res.render("fupload")
})

app.post("/upload", upload.single('userfile'),(req, res)=>{
    console.log(req.filename);
     var sql="insert into img(filename, originalname) values(?,?)";
    conn.query(sql,[req.file.path,req.file.originalname],()=>{
    res.send('/서버에 올라감');
    })
  
})

app.get("/show",(req, res)=>{
    let sql="select * from img order by id desc";
    conn.query(sql,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log("data",data);
            res.render("imglist",{rows:data})
        }
    })
}) 


app.listen(3001,()=>{
    console.log("express server running....")
})