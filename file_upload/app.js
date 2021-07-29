const express=require('express');
var multer  = require('multer')
var fs=require('fs');
var mysql=require('mysql');
const config=require('./db/dbconn');

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //파일이 이미지 파일이면
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
    console.log("그림파일")
    cb(null, 'uploads/images')
    //텍스트 파일이면
    } else  {
    console.log("텍스트 파일")
    cb(null, 'uploads/texts')
    }
    },
    //파일이름 설정
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

app.set('views','./views');
app.set('view engine','ejs');

app.get("/",(req, res)=>{
    res.render("index");
})

app.get("/fupload",(req, res)=>{
    res.render("fupload")
})

app.post("/fupload", upload.single('userfile'),(req, res)=>{
    console.log(req.filename);
     var sql="insert into file_upload(file_name) values(?)";
    conn.query(sql,[req.file.path],()=>{
    res.send('/서버에 올라감');
    })
  
})


app.get("/show",(req, res)=>{
    let sql="select * from file_upload";
    conn.query(sql,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            res.render("list",{rows:data})
        }
    })
})

app.get('/down/uploads/texts/:name',(req,res)=>{
    const filename=req.params.name;
    const file=__dirname+'\\uploads\\texts\\'+filename;
    console.log('file',file);
    res.download(file);
})

app.get('/imgshow',(req,res)=>{
    res.send('hi');
})

app.listen(3000,()=>{
    console.log("express server running....")
})