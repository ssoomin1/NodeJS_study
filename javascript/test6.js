//1. user배열에 3개의 객체가 들어간다. 
function Person(name,age){
    this.name=name;
    this.age=age;
}

let p1=new Person("kim",30);
let p2=new Person("lee",25);
let p3=new Person("park",27);

let user=[p1,p2,p3];

//구조를 보고 싶을때 console.dir(users);

//2. name:kang age:35를 맨 뒤에 추가하고 배열 길이 출력
let p4=new Person("kang",35);
user.push(p4);
user.forEach(function(value){
    console.log(value);
})
console.log(user.length);
//3. 맨 뒤의 데이터 빼내고 배열 길이 출력
user.pop();
console.log("길이:",user.length);
user.forEach(function(value){
    console.log(value);
})
//4. 맨 앞에 name:ko, age:40 추가하고 배열의 길이 출력
user.unshift(new Person("ko",40));
console.log(user.length);
//5.맨 앞의 데이터 빼내고 배열길이 출력
user.shift();
console.log(user.length);
//6. 2번째 데이터 삭제
delete user[1];
console.dir(user);

//7.forEach이용해서 값 출력
user.forEach(function(value){
    console.log(value);
})
