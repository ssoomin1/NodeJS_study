const http = require('http');
const server = http.createServer();
server.listen(3001,()=>{
    console.log('Running at localhost...');
})

//1. 사용자 접속 이벤트 처리
//객체.on('connection',콜백함수)
server.on('connection',(socket)=>{
    console.log('사용자가 접속했습니다.');
})

//2. 사용자 요청 이벤트 처리
server.on('request',(req,res)=>{
    console.log('사용자의 요청이 들어왔습니다.');
    //req : 요청 res:응답
    res.writeHead(200,{"Cotent-type":"text/html; charset=utf-8"}) //header
    res.write("<html><head><title></title><body>"); //body
    res.write("Hello Nodejs~!");
    res.write("</body></html>");
    res.end();
})