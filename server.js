const express=require('express');
const app=express();
const port=5158;
const database=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
let connection=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'writer',
});

connection.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("database connected")
    }
});

app.use(express.static('public'));
app.set('view engine','ejs');
// var urlencodedParser=bodyParser.urlencoded({extended:false});
app.set('views'),path.join(__dirname,'views');

app.use(bodyParser.json());
app.get('/index',(req,res)=>{
    const myCookie = req.cookies['Cookie writer name'];
    if(myCookie){
        res.render('index');  
    }
    else{
      res.render('login');
    } 
})

app.get('/edit',(req,res)=>{
    res.render('edit');
})

app.get('/login',(req,res)=>{
    const myCookie = req.cookies['Cookie writer name'];
    if(myCookie){
        res.render('index');  
    }
    else{
      res.render('login');
    }
})
app.post('/createpage',(req,res)=>{
    res.render('edit');
})

app.post('/checkdbvalues',(req,res)=>{
    let sql=`SELECT * FROM writeruser`;
    connection.query(sql,(err,resl)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(resl)
            res.json(resl)
        }
    })  
})

app.post('/signupvalues',(req,res)=>{
   console.log(req.body);
   let name=req.body.username;
   let email=req.body.email;
   let password=req.body.password;
   let sql= `insert into writeruser (name,email,password) values ('${name}','${email}','${password}')`
   connection.query(sql,(err,resl)=>{
    if(err){
        console.log(err)
    }
    else{
        const oneDay = 24 * 60 * 60 * 1000;
        const expiresdate = new Date(Date.now() + oneDay);
        res.cookie(`Cookie writer name`,`encrypted cookie string Value`,{
        expires: expiresdate,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }); 
    }
    res.json('value is send');
   })
})

app.post('/cookieshow',(req,res)=>{
    const oneDay = 24 * 60 * 60 * 1000;
        const expiresdate = new Date(Date.now() + oneDay);
        res.cookie(`Cookie writer name`,`encrypted cookie string Value`,{
        expires: expiresdate,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }); 
    res.json('cookie create')
})

app.post("/deletecookie",(req,res)=>{
    res.clearCookie(`Cookie writer name`);
    return res.redirect("/login");
  })

app.listen(port,()=>console.log('listening server',port));