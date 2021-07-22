const express=require('express');
const app = express();
const port = 3001;
var session = require('express-session')

app.set('views','./views');
app.set('view engine','pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'ktroncke', //세션 아이디를 브라우저에 저장할 때 랜덤하게,세션아이디 보안
    resave: false, //사용자가 접속할 때마다 세션 아이디를 새로 발급하느냐 마느냐를 설정해줌
    saveUninitialized: true
    //사용자가 접속해서 세션을 사용하기 전까지는 sid 발급하지 말아라.
  }))

app.get('/session',(req,res)=>{
    req.session.uid=1; //uid 속성이란 이름으로 1을 셋팅한다. 
    res.send('session created!!');
})

app.get('/result',(req,res)=>{
    res.send('session:'+req.session.uid);
})

app.get('/',(req,res)=>{
    res.send('hi Node');
})

app.listen(port,()=>{
    console.log(`Running at ${port}port`);
})