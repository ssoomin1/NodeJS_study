//express서버 만들기
const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static(__dirname+'/pubilc'));

const fs = require('fs');

app.set('views','./views');
//view를 views폴더에 있는걸 사용하겠다.
app.set('view engine','pug');
app.locals.pretty=true; //소스코드 예쁘게 보여주세요~

app.use(express.urlencoded({extended:true}));

//cb는 콜백함수이다.
var storageA = multer.diskStorage({
    destination: function (req, file, cb) {
        //다른 곳에 분류해서 넣고싶다면
        //if문 사용해서 if img 지면 uploads/img이런식으로 지정
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
      //동일한 파일 업로드할 때 어떻게 처리할것인가에 대한 답변
      //Date.now()가

      //1번방법을 하면 fieldname - userfile로 된다. 
      cb(null,file.originalname);
      //originalname아니면 확장자 안붙음
    }
  })
   
  var upload = multer({ storage: storageA })

app.get("/",(req,res)=>{
    res.send("hi node");
})

app.get("/upload",(req,res)=>{
    res.render("upload_form");
})

app.post("/upload",upload.single('userfile'),function(req,res){
    //upload.single('userfile') :한개의 파일만 올릴 때 ㅅ용
    //upload로 post라우팅이 들어왔을 때 req객체에 file이란 속성을 자동으로 추가시켜 역할
    //req.file
    console.log(req.file);
})



app.listen(3000,()=>{
    console.log('Running Express Server...');
})