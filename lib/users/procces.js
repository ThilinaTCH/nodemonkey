exports.getUser = function(req, fn){
       
    req.getConnection(function(err,connection){
        
        var limit =5;
        var page  = (req.query.page != undefined) ? req.query.page : 0;
        var offset= (page==0) ? 0 : (page - 1) * limit;
      
        var query = connection.query('SELECT * FROM t_user WHERE 1=1 LIMIT ?,?',[offset,limit],function(err,rows){
            
            if(err)
                return fn(false,err);
            else{
                
                countAllUser(req,function(total){
                    
                    //console.log("Total data : %d",total);
                    return fn(true,rows,total);
                });
                
            }
         });
         
         console.log(query.sql);
    });
   
};


function countAllUser(req,fn){

    req.getConnection(function(err,connection){
    
        var query = connection.query('SELECT COUNT(id) as all_user FROM t_user',function(err,rows){
        
            if(err)
                return fn(err);
            else 
                return fn(rows[0].all_user);
        });
    
    });
}

/*Adding users*/
exports.save = function (req, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));
   
    req.getConnection(function (err, connection) {
        
          var exape = {username:temp.username,password_salt:temp.password,password_hash:temp.password};
          connection.query("INSERT INTO t_user set ? ",exape, function(err, rows){
  
	      if (err) {
	        
	      	  return fn(false,err); 
	      	   
	      }else{
	      	
	      	  return fn(true,"user inserted");
	      }

	    });
	    
    });
 
};

