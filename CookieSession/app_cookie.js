const express=require('express');
const app = express();
const port = 3001;
const cookieParser = require('cookie-parser');

app.set('views','./views');
app.set('view engine','pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('hi Node');
})

app.get('/cookie',(req,res)=>{
    res.render('cookie_form');
})

app.post('/cookie',(req,res)=>{
    let uid = req.body.uid;
    res.cookie("userid",uid); //쿠키 이름, 쿠이에 넣을 값
    res.send("쿠키 설정 완료!");
})

app.get('/result',(req,res)=>{
    //쿠키 확인 출력
    console.log(req.cookies.userid);
    res.send(req.cookies['userid']);
})

app.listen(port,()=>{
    console.log(`Running at ${port}port`);
})