const express=require('express');
const app=express();
const port=5154;
const database=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');
// const {url}=require('inspector');

let connection=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'writer',
})

app.use(express.static('public'));
app.set('view engine','ejs');
// var urlencodedParser=bodyParser.urlencoded({extended:false});
app.set('views'),path.join(__dirname,'views');

app.use(bodyParser.json());
app.get('/index',(req,res)=>{
    res.render('index');
})

app.get('/edit',(req,res)=>{
    res.render('edit');
})

app.post('/createpage',(req,res)=>{
    res.render('edit');
})
app.listen(port,()=>console.log('listening server',port));