//모듈불러오기 :require
const os= require('os');//리콰이어메서드를 통해 모듈을 사용한다.
console.log("호스트이름은 "+os.hostname()+"입니다.");
console.log("남은 메모리의 양은 "+os.freemem()+"입니다.");
console.log("총 메모리는 "+os.totalmem());
console.log("저의 운영체제는 "+os.type()+"입니다.");
