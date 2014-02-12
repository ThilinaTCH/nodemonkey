var express = require('express');
var app = module.exports = express();
var procces = require('./procces');

app.set('views',__dirname);
app.set('view engine','ejs');

function paging(total,curr_page){
    
    var limit = 5;
    var page = '';
    var total_page = Math.round(total/limit);
    
    if(parseInt(curr_page) >1)
         page +='<a href="/users?page='+(parseInt(curr_page)-1)+'">Prev</a> ';
   
   for(x = 1;x <= total_page;x++){
        
        if(x == curr_page){
            
            page +='<b>'+x+'</b> ';
        }
        else{
            
            page +='<a href="/users?page='+x+'">'+x+'</a> ';
        }
      
    }
    if(parseInt(curr_page) < total_page)
         page +='<a href="/users?page='+(parseInt(curr_page)+1)+'">Next</a>';
    
    page +=' <span>Page '+curr_page+' of '+total_page+' </span>';
    return page;
}
                
app.get('/users',function(req,res){
   
    var curr_page = (req.query.page != undefined) ? req.query.page : 1;
    procces.countAllUser(req,function(result){
    
        procces.getUser(req,function(status,data){
           
           var params = {
            
                title : 'User list',
                data : data,
                total_data :result,
                pagination : paging(result,curr_page)
           };
           //console.log(params);
           res.render('users.ejs',params);
        });
        
    });
});
