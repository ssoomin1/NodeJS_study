//express서버 만들기
const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({dest:'uploads/'});

app.use(express.static(__dirname+'/pubilc'));

const fs = require('fs');

app.set('views','./views');
//view를 views폴더에 있는걸 사용하겠다.
app.set('view engine','pug');
app.locals.pretty=true; //소스코드 예쁘게 보여주세요~

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("hi node");
})

app.get("/upload",(req,res)=>{
    res.render("upload_form");
})

app.post("/upload",upload.array('userfile',3),function(req,res,next){
    //upload.single('userfile') :한개의 파일만 올릴 때 ㅅ용
    //upload로 post라우팅이 들어왔을 때 req객체에 file이란 속성을 자동으로 추가시켜 역할
    //req.file
    console.log(req.files);
})



app.listen(3000,()=>{
    console.log('Running Express Server...');
})