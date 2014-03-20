var express = require('express');
var app = module.exports = express();
var procces = require('./procces');

app.set('views',__dirname);
app.set('view engine','ejs');

function paging(total,curr_page){
    
    var limit = 5;
    var page = '';
    var total_page = Math.ceil(total/limit);
    
    page = '<ul class="pagination">';
    
    if(parseInt(curr_page) >1)
         page +='<li><a href="/users?page='+(parseInt(curr_page)-1)+'">Prev</a></li>';
   
   for(x = 1;x <= total_page;x++){
        
        var active = '';
        
        if(x == curr_page)
            active = 'class="active"';
          
        page +='<li '+active+'><a href="/users?page='+x+'">'+x+'</a></li>';
        
    }
    if(parseInt(curr_page) < total_page)
         page +='<li><a href="/users?page='+(parseInt(curr_page)+1)+'">Next</a></li>';
    
    page +='</ul>';
    
    var x_showed = limit;
    if(total <  limit)
        x_showed = total
   
    page += '<div class="pull-right" style="margin-top:2px">'
                    +'<h5>'
                    +' <small>Displaying '+x_showed+' of Total '+total+' Item(s)</small>' 
                    +'</h5>'
                 +'</div>';
   
    return page;
}
                
app.get('/users',function(req,res){
    
    console.log(req.session.username);
    
	if(req.session.username){
	
        var curr_page = (req.query.page != undefined) ? req.query.page : 1;
        //procces.countAllUser(req,function(result){
        
            procces.getUser(req,function(status,data,total_data){
               
               var params = {
                
                    title : 'User list',
                    data : data,
                    total_data :total_data,
                    pagination : paging(total_data,curr_page),
                    sess_user : (req.session.username) ? req.session.username : ''
               };
               //console.log(params);
               res.render('users.ejs',params);
            });
            
       // });
    
    }
    else 
	 	res.redirect('/login');
});

app.get('/add-user',function(){

    process.save(req,function(status,msg){
        
        console.log("Status : %s , message : %s ",status ,msg);
        if(status)
            res.redirect('/users');
   });
});
