//express server만들기
const express=require('express');
const app = express();
app.use((req,res,next)=>{
    //req :사용자 요청객체, res:응답객체, next:다음 미들웨어 호출
    console.log('첫번째 미들웨어');
    req.user="kim";
    next();
})

app.use((req,res)=>{
    console.log('두번째 미들웨어');
    //res.send(`The result : ${req.user}`)    
    //하나의 블럭에는 send가 한번만 쓰여야함
    //json:자바스크립트의 데이터형식

    const person={name:'park',age:29};
    const person2=JSON.stringify(person); //JSON형식을 문자열로 변환시킴
    res.send(person2);

    //문자열을 JSON형식 : JSON.parse();
})
app.listen(3000,()=>{
    console.log("express 서버 실행중...");
})