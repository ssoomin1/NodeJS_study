//arrow function 화살표가 들어가야함 =>
//1.함수이름으로 만드는 방법 2. 익명함수
function add(x,y){
    return x+y;
}

let add2=(x,y)=>{
    return x+y;
}

function sub(){
    console.log('test');
}

const sub2=()=>{
    console.log('test2');
}

sub2();

let a=10;
let b=20;
console.log("a="+a+"이고 b="+b+"입니다.");
console.log(`a=${a}이고 b=${b}입니다.`);