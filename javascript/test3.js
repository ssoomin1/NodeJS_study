/*
var sum=0;
for(var i=1;i<=10;i++){
    sum+=i;
}
console.log("sum",sum); //55
console.log("i",i); //11
console.log("-------------------");
*/
function foo(){
    var sum=0;
    for(var i=1;i<=10;i++){
        sum+=i;
    }
}
foo();
//console.log("sum",sum); //에러 
//console.log("i",i); //에러

//var는 scope가 함수이다. 
let sum1=0;
for(let i=0;i<=10;i++){
    sum1+=i;
}
//console.log("sum1",sum1);
//console.log("i",i);

console.log("-------------------");
const jae=30;
console.log("jae",jae);
//jae=9; 에러 발생!