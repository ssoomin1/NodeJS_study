console.log('A');

//0초가 지난후에 콜백함수를 실행해라
//콜백함수는 맨 뒤로 가게 된다! -> 비동기
setTimeout(()=>{
    console.log('C');
    console.log('D');
},0)

console.log('B');

//그래서 출력이 A-B-C-D이다.