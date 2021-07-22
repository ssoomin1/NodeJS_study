//배열문~ 

//1 for
//2. for-in
let user=['kim','lee','park'];
for(let i in user){
    console.log(i,user[i]); //i는 인덱스 0 kim 1 lee
}

//객체는 key-value로 이루어짐
const obj = {
    name:'sungjin',
    age:30
}

for(let i in obj){
    console.log(i,obj[i]);
}

//3.for-of
const user2=['kim2','lee2','park2'];
for(let value of user2){
    console.log(value);
}

const str="hi javascript";
for(let v of str){
    console.log(v); //한글자씩 찍힌다. 
}

//4.forEach() 배열의 함수 (객체는 사용할 수 없음)
let user3=['kim3','lee3','park3'];  //배열.forEach(콜백함수) 
user3.forEach(function(val,index){
    console.log(val,index);
})

//매개변수로 val만 넣어도 상관없고 거꾸로 값,인덱스 순이다. 