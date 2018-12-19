#!/usr/bin/node

var express = require('express');
var db = require('./database');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.all('*',function(req,res,next){
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

//头像
app.post('/api/avatar', (req, res) => {
    var file = req.body.avatar;
    var buf = new Buffer(file, 'base64');
    // log(buf);
    fs.writeFile('./avatar.jpg', buf, err => {
        if (err) {
            log(err);
            res.send(err);
        } else {
            log("save success");
            res.send("save success");
        }
    });
});


//登录
app.post('/api/login',function(req,res){
	var chunk='';
  const sql='select * from register where account=?';   
	req.on('data',(data)=>{
		chunk=JSON.parse(data);	
    db.query(sql,[chunk.tel],(err,result)=>{
      if(err){
          res.status(500).end('DB ERROR!');
      }else{
        res.send(result);
      }
    });
  });
});
//登陆次数
app.post('/api/login/count',function(req,res){
  req.on('data',(data)=>{
    uid = JSON.parse(data).uid;
    db.query('select * from register where uid=?',[uid],function(err,result){
      if(err){res.status(500).send('DB ERROR!');}
      else{
        count = result[0].loginCount;
        // console.log('count:',count);
        if(count==0){
          console.log('count:',count);
          res.send('0');
          db.query('update register set loginCount=? where uid=?',[count+1,uid],function(err,result){
            if(err){
                res.status(500).end('DB ERROR!');
            }
          });
        }        
      }
    });    
  })
});





//注册
app.post('/api/register',function(req,res){
  console.log('register');
  body=req.body;
  console.log('body.tel:',body.tel);
  db.query('select * from register where account=?',[body.tel],function(err,result){
      if(err){
        res.status(500).end('DB ERROR!');
      }if(result[0]){
        res.send('1');
      }else{
        res.send('0');
        db.query('insert into register(account,password) values(?,?)',[body.tel,body.pwd],(err,result)=>{
          if(err){
            res.status(500).end('DB ERROR!');
          }
          db.query('select * from register where account=?',[body.tel],(err,result)=>{
            if(err){
              res.status(500).end('DB ERROR!');
            }else{
              // console.log(result);
              uid=result[0].uid;
              db.query('insert into user_info(uid,avatar,bid) values(?,"moren.jpg",1)',[uid],(err,result)=>{
                if(err){
                  res.status(500).end('DB ERROR!');
                }
                // console.log(result);
              });
            }
          });
        });           
      }
  });
});




// 动态
get("select * from dynamic order by did desc", "contact");
//动态详情
get("select * from classes", "contact/contactail");
//用户信息
get("select * from user_info","contact/user_info");

// get
function get(sql, path) {
    app.get('/api/' + path, function (req, res) {
        db.query(sql, function (err, result) {
            if (err) {
                console.error(err);
            }
            // console.log('result:',result);
            res.send(result);
        })
    })
}
//post
function post(sql, url) {
    var options = [];
    app.post('/api/' + url, function (req, res) {
        var body = req.body;
        options = [];
        for (var i in body) {
            options.push(body[i]);
        }
        // console.log('options',options);
        db.query(sql, [...options], function (err, result) {
            if (err) {
                res.send(err);
            }
            // console.log('result:',result);
        });
    });
}

var assess = "insert into assess(did,uid,time,content) values(?,?,?,?)";
post(assess, 'contact/contactail/assess');
//传评论
var assess2 = 'select * from assess order by sid desc';
get(assess2, "contact/contactail/assess");


//动态上传图片
app.post('/api/contact/release/dynamic', (req, res) => {
    var file = req.body.dynamic;
    var name = req.body.name;
    console.log(name);
    var buf = new Buffer(file, 'base64');
    // log(buf);
    fs.writeFile('../project/src/assets/imgs/download/' + name, buf, err => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("save success");
            res.send("save success");
        }
    });
});
//发布动态
post('insert into dynamic(uid,title,content,imgs,cid,time) values(?,?,?,?,?,?)', 'contact/release');


//查询是否关注
var isAtten="select * from attention where uid=? and aid=?";
postR(isAtten,"contact/contactail/isAtten");
//查询是否收藏
var isCollec="select * from collection where uid=? and did=?";
postR(isCollec,"contact/contactail/isCollec");

//关注表
post("insert into attention(uid,aid) values(?,?)","contact/contactail/attention");
//取消关注
post("delete from attention where uid=? and aid=?","contact/contactail/noattention");
//收藏动态
post("insert into collection(uid,did) values(?,?)","contact/contactail/collection");
//取消收藏动态
post("delete from collection where uid=? and did=?","contact/contactail/nocollec");




var uid;//获取用户id
app.post('/api',(req,res)=>{
  uid=req.body.uid;
  console.log('uid',uid);
});

//Home
//首页获取各分类推文的函数
function getPassage(url,sql){
    app.get('/api/'+url, (req, res) => {
      if(!uid){  //uid为空  未知体质状况  uid位默认平和质用户
          db.query(sql, [1], (err, results) => {  //此处要求数据库必须有一个默认系统创建的用户（平和质） uid=1并且bid=1
              if (err) {
                  // console.log(err.message);
                  res.status(500).send('DB error');
              }
              res.status(200).send(results);
          });
      }
      else{  // bid非空  已知体质状况        发发发
          db.query(sql, [uid], (err, results) => {
              if (err) {
                  // console.log(err.message);
                  res.status(500).send('DB error');
              }
              res.status(200).send(results);
          });
      }    
    })
}
//推荐
getPassage('tuijian','select * from recommend where bid in (select bid from user_info where uid=?)');
//健身方面
getPassage('jianshen','select * from recommend where cid=1 and bid in (select bid from user_info where uid=?)');
//饮食方面
getPassage('yinshi','select * from recommend where cid=2 and bid in (select bid from user_info where uid=?)');
//理疗方面
getPassage('liliao','select * from recommend where cid=3 and bid in (select bid from user_info where uid=?)')
// 宜忌
getPassage('yiji','select * from shoulds where bid in (select bid from user_info where uid=?)');



//Hometail
app.post('/api/hometail',(req,res)=>{
  // console.log('hometail');
  // console.log('req.body:',req.body);
  body = req.body;
  const sql = 'select * from recommend where rid=?';
  db.query(sql,[body.rid],(err,results)=>{
    if(err){
        res.status(500).send('DB error');
    }
    res.status(200).send(results);
  });
});

//收藏推文
post("insert into collectionR(uid,rid) values(?,?)","hometail/collect");
//取消收藏推文
post("delete from collectionr where uid=? and rid=?","hometail/uncollect");

// 查看是否已经收藏
app.post('/api/hometail/iscollect',(req,res)=>{
  body=req.body;
  const sql = 'select * from collectionr where uid=? and rid=?';
  db.query(sql,[body.uid,body.rid],(err,results)=>{
    if(err){
      rea.status(500).send('DB error');
    }
    res.status(200).send(results);
  });
});





//计划页
get('select * from plan','plan');
//保存计划
post('insert into userplan(uid,pid,status) values(?,?,0)','plan/saveplan');
//删除计划
post("delete from userplan where uid=? and pid=?","plan/delplan");

//post并返回结果
function postR(sql,path){
  var options=[];
  app.post('/api/'+path,(req,res)=>{
    body=req.body;
    for(var i in body){
      options.push(body[i]);
    }
    // console.log('options:',options);
    db.query(sql,[...options],(err,result)=>{
      if(err){
        res.status(500).send('DB error');
      }
      // console.log('result:',result);
      res.status(200).send(result);
    })
  });
}

postR('select * from plan where pid in (select pid from userplan where uid=?)','plan/userplan');
//修改计划状态
postR('update userplan set status=? where uid=? and pid=?','plan/changeStatus');
//获取计划状态
postR('select status from userplan where uid=? and pid=?','plan/getStatus');




//我的页面

function mePage(url,sql){
  app.post('/api/'+url,function(req,res){
    body=req.body;
    console.log('body:',body);
    db.query(sql,[body.uid],function(err,result){
      if(err){res.status(500).send('DB error');}
      else{res.status(200).send(result);}
      console.log('result:',result);
    }); 
  });
}

mePage('me','select * from user_info where uid=?');
//个人资料
mePage('usertail','select * from user_info where uid=?');
mePage('usertail/tel','select * from register where uid=?');

//个人资料
app.post('/api/usertail/save',function(req,res){
  data=req.body;
  uid = data.uid;
  const tail = 'update user_info set avatar=?,nickname=?,signature=?,sex=?,birth=?,city=? where uid='+uid; 
  db.query(tail,[data.avatar,data.nickname,data.signature,data.sex,data.birth,data.city],(err,result)=>{
    if(err){res.status(500).send('DB error');}
    else{res.status(200).send(result);}
  });
});
//我的收藏
mePage('mylikesd', 'select dynamic.* from dynamic,collection where dynamic.did = collection.did and collection.uid=?');
mePage('mylikesr', 'select recommend.* from recommend,collectionr where recommend.rid = collectionr.rid and collectionr.uid=?');
//我的动态
mePage('mydynamic','select * from dynamic where uid=?');
//用户信息
mePage('mydynamic/user_info','select * from user_info where uid=?');
//我的动态详情
postR('select * from dynamic where did=?','mydynamictail');
postR('select * from user_info where uid=?','mydynamictail/user_info');



//我的关注
postR('select * from user_info where uid in (select aid from attention where uid = ?)','myattention');
//关注
post("insert into attention(uid,aid) values(?,?)","myattention/attention");
//取消关注
post("delete from attention where uid=? and aid=?","myattention/noattention");
//我的粉丝
postR('select * from user_info where uid in (select uid from attention where aid = ?)','myfans');
postR('select * from attention where uid =? and aid = ?','myfansa');
//关注
post("insert into attention(uid,aid) values(?,?)","myfans/attention");
//取消关注
post("delete from attention where uid=? and aid=?","myfans/noattention");



//bodytest页面后台代码
var selectsql='select * from question';
//查询题库中所有的问题
get(selectsql,'question');

//个人测试分数的添加和更新两种操作
var insertsql='insert into scores(uid,pinghe,qixu,yangxu,yinxu,tanshi,shire,xueyu,qiyu,tebing) values(?,?,?,?,?,?,?,?,?,?)'
//如果没测试，测试后更新scores数据库的分数
post(insertsql,'question1');

//测试过后更新数据库的分数
app.post('/api/question2', function (req, res) {
  var options = [];
  body=req.body;
  uid=body.uid;
  var update='update scores set pinghe=?,qixu=?,yangxu=?,yinxu=?,tanshi=?,shire=?,xueyu=?,qiyu=?,tebing=? where uid='+uid;
  for (var i in body) {
      options.push(body[i]);
  }
  options.pop();
  console.log('pop:',options);
  db.query(update, [...options], function (err, result) {
    if (err) {
      res.end(err);
    }
  });
});

//查询分数进行计算主体质和倾向的体质
postR('select * from scores where uid=?','flag');


//计算后更新用户信息表的主体质id
// postR('update user_info set bid=? where uid=?','question/main');
app.post('/api/question/main',(req,res)=>{
  var options=[];
  body=req.body;
  console.log('body:',body);
  for (var i in body) {
    options.push(body[i]);
  }
  var physique='update user_info set bid=? where uid=?';
  db.query(physique,[...options],function (err, result) {
    if (err) {
      res.status(500).send('DB error');
    }
    res.status(200).send(result);
  });
});
//请求用户表的体质:/api/body/main
postR('select bid from user_info where uid=?','body/main');
//查询body表中所有的体质报告中调养方法  /api/body
get('select * from body','body');


// 搜索页
var key;
// 搜索推文结果
app.post('/api/searchArticle',(req,res)=>{
    body=req.body;
    key = body.key;
    key = '%' + key + '%';
    const sql = 'select * from recommend where title like ?';
    db.query(sql,[key],(err,results)=>{
      if(err){
        res.status(500).send('DB error');
      }
      // console.log(results);
      res.status(200).send(results);
    });    
});
//搜索动态结果
app.post('/api/searchDynamic',(req,res)=>{
    body=req.body;
    key = body.key;
    key = '%' + key + '%';
    const sql = 'select * from dynamic where content like ?';
    db.query(sql,[key],(err,results)=>{
      if(err){
        res.status(500).send('DB error');
      }
      // console.log(results);
      res.status(200).send(results);
    }); 
});

app.listen(8080);
