const express =require('express');
const multer = require('multer');

const fs = require('fs');
const app = express();

app.use(express.static(__dirname,+'/public'));
app.set('views','./views');
app.set('view engine','pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));


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

app.get('/',(req,res)=>{
    res.send("uploadFile");
})
app.get("/upload",(req,res)=>{
    res.render('upload_form');
})

app.post('/upload',upload.single('userfile'),(req,res)=>{
    let writer = req.body.writer;
    let date = req.body.date;
    let description = req.body.description;
    let info = writer + "   "+date+"    "+description+'\n';

    fs.appendFile("message.txt",info,'utf8',(err)=>{
        if(err) console.log(err);
        else res.send('사진이 저장되었습니다.');
    })
})
// app.post("/upload",(req,res)=>{
//     let _title = req.body.title;
//     let _description = req.body.description;

//     fs.writeFile('./data/'+_title,_description,(err)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log("saved!!");
//         }
//     })

//     fs.readdir('./data',(err,files)=>{
//         if(err){
//             console.log(err);
//         }else{
//             //files는 모든 파일들이 들어가있다.
//             //매개변수 넘길때는 리스트로 넘겨준다 
//             res.render("view",{lists:files,title:'welcome',description:'hello'})
//             //index.pug 실행 lists , title, description
//         }
//     })
// })

// app.get('/lang/:id',(req,res)=>{
//     const param = req.params.id;
//     fs.readdir('./data/'+param,'utf8',(err,data)=>{
//         if(err){console.log(err);}
//         else{
//             res.render('view',{title:param,lists:files,desc:data})
//         }
//     })
// })


app.listen(3000,()=>{
    console.log("Running Express Server at localhost...");
})