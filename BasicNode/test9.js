//express 모듈을 가지고와서 express에 집어넣어
const express = require('express');
//2. express 객체 생성(express()함수 이용해서 app에 대 입)
const app = express(); //express서버가 객체로 저장된다. 
//3.app의 listen메서드 

//라우터 
app.get("/",(req,res)=>{
    res.send("Hi Express~!");
})

app.listen(3000,()=>{
    console.log('Running express server at 127.0.0.1...');
})