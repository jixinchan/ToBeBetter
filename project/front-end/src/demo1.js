const http=require('http');
const url=require('url');
const mysql=require('mysql');
const con=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'fresh'
});
con.connect();

function connect(req,res,account,password){
  const sql='insert into register(account,password) values(?,?)';  
  con.query(sql,[account,password],(err,result)=>{
    if(err){
        res.end(err);
    }
    console.log(result);
  });  
}

http.createServer((req,res)=>{
  if(url.parse(req.url).pathname==='/register' && req.method=== 'POST'){
     req.on('data',(data)=>{ 
        data=JSON.parse(data);
        console.log(data); 
        connect(req,res,data.tel,data.pwd);
     });
  }
  res.setHeader('Access-Control-Allow-Methods','*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE');
  res.setHeader('Access-Control-Allow-Origin','*');

  res.end();
}).listen(8080); 