#!/usr/bin/node

var express = require('express');
var db = require('./database');
var app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.all('*',function(req,res,next){
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


/////////////////////////////////////////////////////////////////// 首页&&个人信息
function get(sql, url) {
    app.get('/api/' + url, (req, res) => {
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        })
    })
}
function postR(sql,path){
  var options=[];
  app.post('/api/'+path,(req,res)=>{
    body=req.body;
    options=[];
    for(var i in body){
      options.push(body[i]);
    }
    console.log('options:',options);
    db.query(sql,[...options],(err,result)=>{
      if(err){
        res.status(500).send('DB error');
      }
      // console.log('result:',result);
      res.status(200).send(result);
    })
  });
}

//登录
postR('select * from admins where username=?','login');

// 首页
get('select COUNT(*) num from user_info','home/usercount');
get('select COUNT(*) num from dynamic','home/dcount');

// 个人信息
get('select * from user_info','userinfo');

app.post('/deluser',(req,res)=>{
    var uid = req.body.uid;
    const sql = "delete from user_info where uid=?";
    db.query(sql,[uid],(err)=>{
        if(err){
            console.log(err);
            res.status(500).send('DB error');
        }
        res.status(200).send();
    });
});


/////////////////////////////////////////////////////////////////// 推荐&&宜忌
//yf post
function post(sql, url) {
    var options = [];
    app.post('/api/' + url, function (req, res) {
        // console.log(req.body);
        var body = req.body;
        options = [];
        for (var i in body) {
            options.push(body[i]);
        }
        // console.log(options);
        db.query(sql, [...options], function (err, result) {
            if (err) {
                res.send(err);
            }
            res.send(result);
        });
    });
}
//系统推荐
var desc = 'select * from recommend order by rid desc';
get(desc, 'recommend/desc');
var asc='select * from recommend';
get(asc, 'recommend/asc');
var delrecommend = 'delete from recommend where rid=?';
post(delrecommend, 'recommend');
var selectrid = 'select * from recommend where rid=?';
post(selectrid, 'recommend/confirm');
var insertrecommend = 'insert into recommend(bid,content,imgs,cid,title,rid) values(?,?,?,?,?,?)';
post(insertrecommend, 'recommend/confirm/insert');
var updaterecommend = 'update recommend set bid=?,content=?,imgs=?,cid=?,title=? where rid=?';
post(updaterecommend, 'recommend/confirm/update');
var selectbid='select * from recommend where bid=?';
post(selectbid,'recommend/select');

//宜忌
var desc2 = 'select * from shoulds order by sid desc';
get(desc2, 'shoulds/desc');
var asc2='select * from shoulds';
get(asc2, 'shoulds/asc');
var delshoulds = 'delete from shoulds where sid=?';
post(delshoulds, 'shoulds');
var selectsid = 'select * from shoulds where sid=?';
post(selectsid, 'shoulds/manage');
var insertshoulds = 'insert into shoulds(should,avoid,bid,sid) values(?,?,?,?)';
post(insertshoulds, 'shoulds/manage/insert');
var updateshoulds = 'update shoulds set should=?,avoid=?,bid=? where sid=?';
post(updateshoulds, 'shoulds/manage/update');
var selectbid2='select * from shoulds where bid=?';
post(selectbid2,'shoulds/select');

//题库页面后台代码
//查询题库中所有的问题
get('select * from question','question');
//删除题库中的问题
post('delete from question where qid=?','delete/question');
//编辑数据库中的问题
post('update question set question=? where qid=?','edit/question');
//通过体质进行筛选
post('select * from question where bid=?','somatoplasm');
//增加题目
post('insert into question (qid,question,bid) values(?,?,?)','add/question');

//管理员信息页面
//查询所有管理员信息
get('select * from admins','admins');
//增加管理员
post('insert into admins (mid,username,password,roles) values(?,?,?,?)','add/admin');
//修改管理员信息
app.post('/api/edit/admin',(req,res)=>{
	var body=req.body;
	var mid=body.mid,usr=body.username,pwd=body.password,role=body.role;
	console.log('body:',body);
	db.query('update admins set username=?,password=?,roles=? where mid='+mid,[usr,pwd,role],(err,result)=>{
		if(err){
			res.status(500).send('DB error!');
		}else{
			res.status(200).send(result);
		}
	});
});
//删除管理员
post('delete from admins where mid=?','delete/admin');


post('select * from user_info where uid=?','infodetail');
//我的动态
post('select * from dynamic where uid=?','infodynamic');
post('delete from dynamic where did=?','delmd');
//我的收藏
post('select dynamic.* from dynamic,collection where dynamic.did = collection.did and collection.uid=?','infoliked');
post("delete from collection where uid=? and did=?","delcd");

post('select recommend.* from recommend,collectionr where recommend.rid = collectionr.rid and collectionr.uid=?','infoliker');
post("delete from collectionr where uid=? and rid=?","delcr");

//我的关注
post('select * from user_info where uid in (select aid from attention where uid = ?)','infoattention');
post("delete from attention where uid=? and aid=?","delat");

//我的粉丝
post('select * from user_info where uid in (select uid from attention where aid = ?)','infofans');
post('delete from attention where uid=? and aid=?','delfa');

app.listen(8080);
