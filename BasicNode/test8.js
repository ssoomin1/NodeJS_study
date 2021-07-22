//웹서버 만들기
const _fs= require('fs');
const http = require('http');
const server = http.createServer();
server.listen(3001,()=>{
    console.log('사용자가 접속하였음');
})
//사용자 요청 이벤트 처리
//1. 서버의 응답 lion1.png출력
server.on('request',(req,res)=>{
    console.log('사용자 요청!');
    _fs.readFile("lion1.png",(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{"Content-type":"image/png"})
            res.write(data);
            res.end();
        }
    })
})
//2.readFile()
//3. content-type:image/png
