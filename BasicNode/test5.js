//파일처리를 하려면 fs모듈이 필요해
const _fs=require('fs');

//readFile(파일이름,콜백함수)
_fs.readFile("data.txt",'utf8',(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})

//fs.writeFile
//nodejs is server side javascript 를 write.txt에 저장시키기
//콘솔창에는 Saved!!!출력

const wdata = new Uint8Array(Buffer.from('nodejs is server side javascript'));
_fs.writeFile('write.txt',wdata,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Saved!!!');
    }
})