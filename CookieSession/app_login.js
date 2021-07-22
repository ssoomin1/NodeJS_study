const express = require('express');
const app = express();
var session = require('express-session');
//session의 값은 기본 : 메모리에 저장
//session 지속적으로 저장할 때 : file /db에 해준다. 메모리보다는

app.set('views','./views');
app.set('view engine','pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'blackmamaba',
    resave:false,
    saveUninitialized:true
}))

app.get('/welcome',(req,res)=>{
    //if문으로 체크해주기 (1) 로그인되어있으면 바로 hello로 가시고
   //(2)아니면 welcome창 뜨도록
    if(req.session.nickname){
        res.render('hello',{sid:req.session.nickname});
    }else{
        res.render('welcome');
    }
})

app.get('/login',(req,res)=>{
    res.render('login_form');
})

app.post('/login',(req,res)=>{
    const id='kim';
    const passwd='1111';
    
    let uid=req.body.uid;
    let upass=req.body.upass;

    //둘 다 맞을 때
    if(uid===id && upass===passwd){
        req.session.nickname='soomin';
        res.render('hello',{sid:req.session.nickname});
    }else if(upass !== passwd){
        res.send('비밀번호가 맞지 않습니다.');
    }else if(uid !== id){
        res.send('아이디가 없습니다.');
    }
})

app.get('/logout',(req,res)=>{
    delete req.session.nickname;
    res.render('welcome');
})
app.listen(3000,()=>{
    console.log('Running Express Server at 3000 port');
})