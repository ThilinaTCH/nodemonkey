var express = require('express');
var app = module.exports = express();
var http = require('http');
var mysql = require('mysql');

var connection  = require('express-myconnection');

/*----------------------------------
    Setup main environments
------------------------------------*/
app.set('port',process.env.PORT || 3720);
app.use(express.logger('dev'));
app.set('views',__dirname);
app.use(express.static(__dirname + '/public')); // set this for static load assests

app.set('view engine','ejs');
/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306,
        database:'nodejs'

    },'request')

);

/*-----------------------------------
    Set routes and middleware
-----------------------------------*/

//hrus diatas router
app.use(express.cookieParser('shhhh, very secret yoooo'));
app.use(express.session());

var login = require('./lib/login');
var users = require('./lib/users');


app.use(express.json());
app.use(express.urlencoded());
app.use(login);
app.use(users);



app.use(app.router);

/*Create server*/
http.createServer(app).listen(app.get('port'),function(){

    console.log('Listening port : %s ', app.get('port'));
});
