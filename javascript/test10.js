//콜백함수 5번 호출하기
/*
let callTimes=(callback)=>{
    for(var i=0;i<5;i++){
        callback();
    }
}

let testB=()=>{
    console.log("testB함수입니다.");
}

callTimes(testB);
console.log("========================");
callTimes(()=>{
    console.log('TestB 함수입니다.');
})
*/

let add=(a,b,cb)=>{
    d=a+b;
    cb(d);
}

var k=(x)=>{
    console.log(x);
}

add(10,20,(result)=>{
    console.log("result:",result);
}); //그냥 k만 넘기면 됐던 문제.


