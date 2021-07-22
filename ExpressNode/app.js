const express = require('express');
const app = express();

//app.use(express.static('public')); < 상대경로
//static 이라는 미들웨어를 사용해 public을 /로 지정함
//app.use('/public',express.static('public'));
//이건 절대경로이다. 
app.use(express.static(__dirname+'/public'));
console.log('__dirname',__dirname); // C:\nodeJS_study\ExpressNode
app.listen(3000,()=>{
    console.log('Running express server at localhost...');
})