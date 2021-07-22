const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'));

app.set('views', './views');
//나는 view를 사용하겠다. ...MVC패턴 Model View Controller
//사용하는 템플릿엔진은 view폴더에 저장할 거다. 
app.set('view engine', 'pug')
//나는 pug를 사용하겠다.
app.locals.pretty=true;  //예쁘게 해주기

app.use(express.urlencoded({extended:true}));
//응답할 때 객체 안에 객체를 넣을 수 있도록
// 근데 이거 안 써주면 post인식 못한다.
// 원래는 body-parser 모듈 썼는데 자동으로 기본모듈이 되면서 써줄 필요가 없어졌다.

//라우터
app.get("/",(req,res)=>{
    res.send("hi pug~ mung mung like Yoon dowoon");
    //서버에서 클라이언트에게 응답을 준다.
})

app.get("/template",(req,res)=>{
    //template으로 접속했을 때 temp라는 pug파일 열리게
    res.render("temp");
})

app.get("/login",(req,res)=>{
    res.render("login_form");
})

app.post("/login",(req,res)=>{
    let _uid = req.body.uid;
    let _upw=req.body.upw;
    //kim 1111이면 welcome띄우고 아니면 돌려보내기
    res.send(`아이디는 ${_uid}이고 비밀번호는 ${_upw}`);
})

app.get("/temp",(req,res)=>{
    let _id=req.query.name;
    let _pass = req.query.password;
    res.send(`이름은 ${_id}이고 비밀번호는 ${_pass}입니다.`);
})

app.listen(3000,()=>{
    console.log('Running express server at localhost...');
})