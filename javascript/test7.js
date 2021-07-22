//add라는 함수 만들고 3,5를 넘겨서 더한 합을 출력시키기
// function add(num1,num2){
//     return num1+num2;
// }

//익명함수로 바꾸어보기
const add = function(num1,num2){
    return num1+num2;
}
console.log(add(3,5));

//자바스크립트는 prototype based languange이다.
//자바스크립트 함수는 일급객체로 나눈다. (first class)
//일급객체 : 변수에 할당 가능
//매개변수로 함수를 넘길 수 있다. 
//리턴값으로 함수를 넘길 수 있다.  
//return function(){
//    console.log('test');
//}

//익명함수로 만들기
//1. n부터 m까지 더한 합 출력
const total = function(n,m){
    let sum=0;
    for(let i=n;i<=m;i++){
        sum+=i;
    }
    return sum;
}

console.log(total(5,8));
//2. n을 넘겨서 짝수인지 홀수인지 판별하여 출력
const isOdd = function(n){
    if(n%2===0){
        return "짝수";
    }else{
        return "홀수";
    }
}

console.log(isOdd(7));
//3.person객체를 만들고 name:kim. age:30 add:x,y 더한값 리턴
const Person = {
    name:"kim",
    age:30,
    add:function(x,y){
        return x+y;
    }
}
console.log("add함수:",Person.add(3,5));
console.log(Person);
//4.person2객체 만들고 list:객체 삽입 
const Person2 = {
    list:{kim:30,lee:28,park:35},
    show:function(){
        console.log('hi hello');
    }
}

Person2.show();
Person2['show']();
console.log("Person2 객체",Person2);

