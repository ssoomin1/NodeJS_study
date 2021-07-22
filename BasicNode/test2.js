//모듈 내보내기 : export / module exports - 객체만 내보낼 수 있음
//let calc = {};
//add함수 속성으로 추가(a,b)
//calc.add=(a,b)=>{
//    return a+b;
//}

module.exports=function(a,b){
    return a+b;
} //이 안에 객체가 들어가있음
//이를 통해 함수 == 객체 이것을 알 수 있음


