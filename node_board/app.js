const express = require('express'); 
const mysql = require('mysql'); 
const format = require('date-format'); 
const moment =require('moment');  
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
//파일업로드
var multer = require('multer');
var fs = require('fs');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //파일이 이미지 파일이면
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
        console.log("그림파일")
        cb(null, 'uploads/images')
    //텍스트 파일이면
    } else  {
        console.log("텍스트 파일")
        cb(null, 'uploads/texts')
    }
    },
    //파일이름 설정
    filename: function (req, file, cb) {
    //cb(null, file.originalname+'_'+Date.now())
    cb(null, file.originalname)
    }
    
    })
    
var upload = multer({ storage: _storage })
const methodOverride = require('method-override'); //put이나 delete사용하게 해주는 꼼수

const app = express();

app.use(express.static('public')); //public폴더 만들기
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs'); 
app.set('views','./views');

//날짜 포맷지정해주기
const dateFor = moment().format('YYYY-MM-DD HH:mm:ss');

//1. mysql connection만들기
const conn=mysql.createConnection({
    host:'localhost',
    user:'nboard',
    password:'1111',
    database:'nodeboard'
})
conn.connect();

//쿼리 객체 생성
const sql = {
    join:'insert into user(name,password,phone_num,email,join_date) values (?,?,?,?,?);',
    login : 'select * from user where name=? and password=?',
    writef : 'insert into board(writer,title,content,b_passwd,file_name,hit,reg_date) values (?,?,?,?,?,?,?)',
    write : 'insert into board(writer,title,content,b_passwd,hit,reg_date) values (?,?,?,?,?,?)',
    read : 'select * from board order by id desc',
    showdetail : 'select * from board where id=?',
    hitupdate : 'update board set hit=? where id=?',
    edit:'update board set writer=?,title=?,content=?,b_passwd=?,file_name=?,modi_date=? where id=?'
}


//세션
var options = {
	host: 'localhost',
	port: 3306,
	user: 'nboard',
	password: '1111',
	database: 'nodeboard'
};
var sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

//라우터
app.get('/',(req,res)=>{
    conn.query(sql.read,(err,datas)=>{
        if(err){console.log(err);}
        else{
            console.log(datas);
            res.render('index',{lists:datas,se:req.session.nickname});
        }
    })
})

//회원가입 
//1-1. form으로 이동
app.get('/join',(req,res)=>{
    res.render('join_form');
})

//1-2. 회원가입구현
app.post('/join',(req,res)=>{
    const _uname=req.body.uname;
    const _upw = req.body.upw;
    const _uemail = req.body.uemail;
    const _upnum = req.body.upnum;
    const _date = dateFor;

    conn.query(sql.join,[_uname,_upw,_uemail,_upnum,_date],(err)=>{
        if(err){console.log(err);}
        else{
            res.send('<script type="text/javascript">alert("회원가입이 완료되었습니다."); document.location.href="/";</script>');
        }
    })
})

//로그인
app.get('/login',(req,res)=>{
    res.render('login_form');
})

//2-2.로그인과정구현
app.post('/login',(req,res)=>{
    const uname = req.body.uname;
    const upw = req.body.upw;

    conn.query(sql.login,[uname,upw],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length>0){
                //회원가입이 되어있는 상태라면 세션 만들어주기
                console.log(result);
                req.session.nickname=uname+upw;
                console.log(req.session.nickname);
                res.send('<script type="text/javascript">alert("어서오세요."); document.location.href="/";</script>');
            }else{
                res.send('<script type="text/javascript">alert("다시 한번 확인해주세요.");</script>');
            }
        }
    })
})

//3.글 작성하러가기
app.get('/write',(req,res)=>{
    res.render('write_form');
})

app.post('/write',upload.single('ufile'),(req,res)=>{
    const writer = req.body.uwriter;
    const utitle = req.body.utitle;
    const ucontent = req.body.ucontent;
    const b_passwd = req.body.bpw;
    const regDate = dateFor;
    //일단은 무조건 파일포함
    //if(req.file.path){
        conn.query(sql.writef,[writer,utitle,ucontent,b_passwd,req.file.originalname,0,regDate],(err)=>{
            if(err){console.log(err);}
            else{
                res.send('<script type="text/javascript">alert("등록되었습니다."); document.location.href="/show";</script>');
            }
        })
    //}
    // else{
    //     conn.query(sql.write,[writer,utitle,ucontent,b_passwd,,0,regDate],(err)=>{
    //         if(err){console.log(err);}
    //         else{
    //             res.send('<script type="text/javascript">alert("등록되었습니다."); document.location.href="/show";</script>');
    //         }
    //     })
    // }
})

//글 목록보여주기
app.get('/show',(req,res)=>{
    conn.query(sql.read,(err,datas)=>{
        if(err){console.log(err);}
        else{
            console.log(datas);
            res.render('blist',{lists:datas});
        }
    })
})

//글 내용 (사용자가 보면) => 조회수증가
app.get('/showdetail/:lid',(req,res)=>{
    const id = req.params.lid;
    conn.query(sql.showdetail,[id],(err,data)=>{
        if(err){console.log(err);}
        else{
            res.render('list_detail',{lists:data[0]});
            const newhit = data[0].hit+1;
            conn.query(sql.hitupdate,[newhit,id],(err)=>{
                if(err){console.log(err);}
                else{ console.log('hit+1');}
            })
        }
    })
})

//비밀번호 체크 폼
app.get('/check/:lid',(req,res)=>{
    const id=req.params.lid;
    conn.query(sql.showdetail,[id],(err,data)=>{
        if(err){console.log(err);}
        else{
            res.render('check_form',{_id:id,username:data[0].writer});
        }
    })
})

//비밀번호 체크
app.post('/check',(req,res)=>{
    const name=req.body.uwriter;
    const bpw=req.body.bpw;
    console.log(name+bpw);
    const pwcheckQ='select * from board where writer=? and b_passwd=?';
    conn.query(pwcheckQ,[name,bpw],(err,result)=>{
        if(err){
           console.log(err);
        }else{
            if(result.length>0){
                res.render('edit_form',{lists:result[0]});
            }else{
                res.send('<script type="text/javascript">alert("비밀번호가 틀렸습니다."); history.go(-1);</script>');
            }
        }
    })
})
//글 수정하기
app.post('/edit',upload.single('ufile'),(req,res)=>{
    const id=req.body.uid;
    const writer = req.body.uwriter;
    const utitle = req.body.utitle;
    const ucontent = req.body.ucontent;
    const b_passwd = req.body.bpw;
    const modi = dateFor;

    conn.query(sql.edit,[writer,utitle,ucontent,b_passwd,req.file.originalname,modi,id],(err)=>{
        if(err){console.log(err);}
        else{
            console.log('update!');
            res.redirect('/');
        }
    })
})

//글 삭제하기

//로그아웃하기 =>로그아웃하면 세션삭제
app.get('/logout',(req,res)=>{
    delete req.session.nickname;
    req.session.save(()=>{
        res.redirect('/');
    })
})

app.listen(3001,()=>{
    console.log('Running Server at 3001 port : board ..');
})