var express = require('express');
var app = module.exports = express();

app.set('views',__dirname);
app.set('view engine','ejs');

app.get('/login',function(req,res){

    res.render('login.ejs');
   
});

app.get('/',function(req,res){

    res.render('login.ejs');
   
});