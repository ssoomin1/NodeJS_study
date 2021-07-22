const myModule={
    name:"kim",
    age:35,
    about:function(){
        console.log(`이름은 ${this.name}이고 나이는 ${this.age}입니다.`);
    }
    //화살표함수는 this를 인식하지못하기 때문에 function()으로 써줘야함
    //자바스크립트 클래스 생성자에도 arrow function 사용못함
}

//console.log(myModule);
module.exports=myModule;
//module.exports의 기본값은 빈 객체 { }이다.