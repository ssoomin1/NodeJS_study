const express=require('express');
const mysql=require('mysql');
const format = require('date-format'); //
const moment=require('moment'); //
require('moment-timezone'); //
moment.tz.setDefault("Asia/Seoul"); //
//요 4개가 date timezone설정해주기

const app=express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))


app.set('view engine','ejs');
app.set('views','./views');

//날짜 포맷 지정
const date = moment().format('YYYY-MM-DD HH:mm:ss');

//1. mysql 연동
const conn = mysql.createConnection({
    host:'localhost',
    user:'test',
    password:'1111',
    database:'testdb'
})
conn.connect();

//2.쿼리를 객체로 생성 (객체:key-value)
const sql = {
    list:'select * from emp order by id desc',
    insert : 'insert into emp(name,emp_number,email,reg_date) values (?,?,?,?)',
    read:'select * from emp where id=?', 
    update:'update emp set name=?, emp_number=?,email=? where id=?',
    delete:'delete from emp where id=?'
}

//목록보기
app.get('/',(req, res)=>{
    conn.query(sql.list,(err,rows)=>{
        if(err){console.log(err);}
        else{
           //console.dir(rows);
            res.render('list',{lists:rows});
            //배열 안에 객체가 들어가있다. [ {kim,1111,},{lee,2222}..]
        }
    });
})

app.get('/new',(req,res)=>{
    res.render('new');
})

app.post('/new',(req,res)=>{
    const _uname = req.body.uname;
    const _enumber = req.body.enumber;
    const _uemail = req.body.uemail;
    const _joinDate = date;

    //conn.query(쿼리문,[지정할 값],콜백함수);
    conn.query(sql.insert,[_uname,_enumber,_uemail,_joinDate],(err)=>{
        if(err){console.log(err);}
        else{
            console.log("Inserted!");
            res.redirect('/');
        }
    });
})

//5. 내용보기
app.get('/read/:id',(req,res)=>{
    const paramId = req.params.id;
    conn.query(sql.read,[paramId],(err,rows)=>{
        if(err){console.log(err);}
        else{
            console.log(rows);
            console.dir(rows);
            res.render('read',{title:'내용보기',rowsX:rows[0]})
        }
    });
})

//6. 수정하기 폼
app.get('/edit/:id',(req,res)=>{
    const pId = req.params.id;
    conn.query(sql.read,[pId],(err,result)=>{
        if(err){console.log(err);}
        else{
            res.render('edit_form',{results:result[0]});
        }
    })
})

//7. 수정하기
app.post('/edit/:id',(req,res)=>{
    const pId = req.params.id;
    const _uname = req.body.uname;
    const _enumber = req.body.enumber;
    const _uemail = req.body.uemail;
    conn.query(sql.update,[_uname,_enumber,_uemail,pId],(err)=>{
        if(err){console.log(err);}
        else{
            console.log('Update!');
            res.redirect('/');
        }
    })
})

//8. 삭제하기
app.get('/delete/:id',(req,res)=>{
    const pId=req.params.id;
    conn.query(sql.delete,[pId],(err)=>{
        if(err){console.log(err);}
        else{
            console.log('Delete!');
            res.render('/');
        }
    })
})

app.listen(4000,()=>{
    console.log('Running express server at localhost..........')
})

