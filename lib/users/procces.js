exports.getUser = function(req, fn){
    
    
    req.getConnection(function(err,connection){
        
        var limit =5;
        var page  = (req.query.page != undefined) ? req.query.page : 0;
        var offset= (page==0) ? 0 : (page - 1) * limit;
      
        var query = connection.query('SELECT * FROM t_user WHERE 1=1 LIMIT ?,?',[offset,limit],function(err,rows){
            
            if(err)
                return fn(false,err);
            else{
                
                return fn(true,rows);
            }
         });
         
         console.log(query.sql);
    });
   
};

exports.countAllUser = function(req,fn){

    req.getConnection(function(err,connection){
    
        var query = connection.query('SELECT COUNT(id) as all_user FROM t_user',function(err,rows){
        
            if(err)
                return fn(err);
            else 
                return fn(rows[0].all_user);
        });
    
    });
};

