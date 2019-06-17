var express = require('express');
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'fresh'
});
const  fs = require('fs');  
//解析post请求的body 
const bodyParser = require('body-parser');
app.use(bodyParser.json());


con.connect();
app.all('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

//查询
function select(sql,url) {
    var options = [];    
    app.post('/api/'+url, function (req, res) {
        req.on('data', (data) => {
            data = JSON.parse(data);
            options = [];
            for (var i in data) {
                options.push(data[i]);
            }
            con.query(sql, [...options], function (err, result) {
                if (err) {
                    res.send(err);
                }
                console.log(result);
                res.send(result);                
            });
        });
    })
}

//注册
var register = 'insert into register(account,password) values(?,?)';
post(register, "register");
//登录验证
var login = "select * from register where account=? and password=?";
select(login,"login");
//关注表
var attention="insert into attention(uid,aid) values(?,?)";
post(attention,"contact/contactail/attention");
//取消关注
var noatten="delete from attention where uid=? and aid=?";
post(noatten,"contact/contactail/noattention");
//收藏
var collection="insert into collection(uid,did) values(?,?)";
post(collection,"contact/contactail/collection");
var nocollec="delete from collection where uid=? and did=?";
post(nocollec,"contact/contactail/nocollec");
//发布评论
assess();
//查询是否关注
var isAtten="select * from attention where uid=? and aid=?";
select(isAtten,"contact/contactail/isAtten");
//查询是否收藏
var isCollec="select * from collection where uid=? and did=?";
select(isCollec,"contact/contactail/isCollec");
//发布动态
post('insert into dynamic(uid,title,content,imgs,cid,time) values(?,?,?,?,?,?)','contact/release');

// 动态
var contact = "select * from dynamic order by did desc";
get(contact, "contact");
//动态详情
var className = "select * from classes";
get(className, "contact/contactail");
//传用户信息表
var user_info="select * from user_info";
get(user_info,"contact/user_info");
//传评论
var assess2='select * from assess order by sid desc';
get(assess2,"contact/contactail/assess");

//动态上传图片
app.post('/api/contact/release/dynamic', (req, res) => {
    var file = req.body.dynamic;
    var buf = new Buffer(file, 'base64');
    // log(buf);
    fs.writeFile('../demo/fresh/src/assets/imgs/download/dynamic.jpg', buf, err => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("save success");
            res.send("save success");
        }
    });
});
//post
function post(sql, url) {
    var options = [];
    app.post('/api/' + url, function (req, res) {
        req.on('data', (data) => {
            data = JSON.parse(data);
            // console.log(data);
            options = [];
            for (var i in data) {
                options.push(data[i]);
            }
            // console.log(options);
            con.query(sql, [...options], function (err, result) {
                if (err) {
                    res.end(err);
                }
                console.log(result);
            });
            res.send();
        });
    })
}
// get
function get(sql, path) {
    con.query(sql, function (err, result) {
        if (err) {
            console.error(err);
        }
        app.get('/api/' + path, function (req, res) {
            // console.log(result);
            res.send(result);
        })
    })
}
//评论
function assess(){
    var options = [];
    var assess="insert into assess(did,uid,time,content) values(?,?,?,?)";
    var assess2='select * from assess order by sid desc';
    app.post('/api/contact/contactail/assess', function (req, res) {
        req.on('data', (data) => {
            data = JSON.parse(data);
            options = [];
            for (var i in data) {
                options.push(data[i]);
            }
            con.query(assess, [...options], function (err, result) {
                if (err) {
                    res.send(err);
                }
                con.query(assess2, [...options], function (err, result) {
                    if (err) {
                        res.send(err);
                    }
                    console.log(result);
                    res.send(result);                
                });              
            });
        });
    })
}

app.listen(8080);
