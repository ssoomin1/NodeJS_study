//객체 
//1. 기본 생성
// const user={
//     kim:10,
//     lee:7,
//     park:25
// }

//2. new 연산자 이용한 생성
const user = new Object();
//const user={}; 와 동일  -> 나는 객체를 생성하겠다. 
//몇 개 만들지는 모르고

//값 넣기 (1) 객체이름.키 = 값 (2)객체이름[키]=값
user.kim=10;
user.lee=25;
user['park'] = 9;

//(3)프로토타입(자바의 클래스와 거의 비슷한 개념)을 이용한 생성
//like 생성자함수
//객체를 만들면 프로토타입이 자동으로 만들어진다. 
//프로토타입 : 함수야...(자바의 생성자함수)
//모든 객체에는 프로토타입이 다 있다. -> 상속같은 개념
function Person(name,age){
    this.name=name;
    this.age=age;
}

//메서드 만들때는 객체명.prototype.메서드명 
Person.prototype.walk = function(){
    console.log("걷는다");
}

let person1= new Person("shin",19);
let person2 = new Person("choi",46);
console.log(person1.name);
console.log(person2.name);
person1.walk();


console.log("-----------------------");
//국어,영어,수학 객체로 받고 총점구하는 메서드까지  sum1()은 총점메서드
//(1) 기본생성

//(2)
const Score2 = new Object();
Score2.kor2=100;
Score2.math2=10;
Score2.eng2=80;

Score2.sum2=function(){
    let total = this.kor2+this.math2+this.eng2;
    console.log("총합2: ", total);
}


//(3)프로토타입
function Score3(kor,eng,math){
    this.kor=kor;
    this.eng=eng;
    this.math=math;
}


Score3.prototype.sum3=function(){
    var total = this.kor+this.eng+this.math;
    console.log("총합: ",total);
}

let sc3=new Score3(100,80,90);
sc3.sum3();
