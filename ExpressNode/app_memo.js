//express서버 만들기
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/pubilc'));

const fs = require('fs');

app.set('views','./views');
//view를 views폴더에 있는걸 사용하겠다.
app.set('view engine','pug');
app.locals.pretty=true; //소스코드 예쁘게 보여주세요~

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("메모장 작성법 : memo로 접속해주세요. ex) localhost:3000/memo");
})

app.get("/memo",(req,res)=>{
    res.render("memo_form");
})

app.post("/memo",(req,res)=>{
    let _uname = req.body.uname;
    let _write_date = req.body.write_date;
    let _content = req.body.content;

    const data={
        "작성자":_uname,
        "작성일자":_write_date,
        "내용":_content
    }
    fs.appendFile('memo.txt',JSON.stringify(data),(err)=>{
        if(err){
            res.send(err);
        }else{
            res.send("메모가 저장되었습니다");
        }
    })

})


app.listen(3000,()=>{
    console.log('Running Express Server...');
})