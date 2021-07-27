const express=require('express');
const mysql=require('mysql');
const format = require('date-format'); //
const moment=require('moment'); //
require('moment-timezone'); //
moment.tz.setDefault("Asia/Seoul"); //
//요 4개가 date timezone설정해주기

const router=express.Router(); //라우터 객체 만들기 모듈별로 만들겠다 그러면 이거 실행

//날짜 포맷 지정
const date = moment().format('YYYY-MM-DD HH:mm:ss');

//목록보기
router.get('/',(req, res)=>{
    conn.query(sql.list,(err,rows)=>{
        if(err){console.log(err);}
        else{
           //console.dir(rows);
            res.render('list',{lists:rows});
            //배열 안에 객체가 들어가있다. [ {kim,1111,},{lee,2222}..]
        }
    });
})

router.get('/new',(req,res)=>{
    res.render('new');
})

router.post('/new',(req,res)=>{
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
router.get('/read/:id',(req,res)=>{
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
router.get('/edit/:id',(req,res)=>{
    const pId = req.params.id;
    conn.query(sql.read,[pId],(err,result)=>{
        if(err){console.log(err);}
        else{
            res.render('edit_form',{results:result[0]});
        }
    })
})

//7. 수정하기
router.post('/edit/:id',(req,res)=>{
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
router.get('/delete/:id',(req,res)=>{
    const pId=req.params.id;
    conn.query(sql.delete,[pId],(err)=>{
        if(err){console.log(err);}
        else{
            console.log('Delete!');
            res.render('/');
        }
    })
})

module.exports=router; //외부에서 이 모듈을 사용할 수 있게 내보내는 역할
//객체.속성 -> 우리가 만든것이 객체이니까