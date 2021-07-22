//1.http 모듈을 가지고와서 http에 대입한다,
const http = require('http');

//2. 웹서버 객체 만들기 (서버객체를 만들어서 server에 대입한다.)
const server = http.createServer();

//3. 웹서버 실행해 대기하기, 거의 3000번을 쓴다.
server.listen(3001,()=>{
    console.log('Running Http Server at localhost...');
})

//이벤트를 리스너락 하는데 대기하는데
//listen인 이유는 사용자의 요청을 기다린다. 누군가 접속할 때까지
