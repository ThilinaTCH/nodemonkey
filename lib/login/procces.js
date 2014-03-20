// Authenticate using our plain-object database of doom!
function fetch_user(req, done)
{   
     req.getConnection(function (err, connection) {
        
        var query = connection.query("SELECT * FROM t_user WHERE ??  = ? ",['username',req.body.username],function(err, rows, fields)
        {
            if (err){
            	throw err;
            }	
            else{
            
	            if(rows.length  > 0)   
	              done(rows); 
	            else 
	            	done(false);
            	
            }
        });
    
        console.log(query.sql);
        
     });

}

function authenticate(req,hash, fn) {
	
 	 if(!module.parent) 
  		console.log('authenticating %s:%s', req.body.username, req.body.password);
  	
    fetch_user(req, function(jsonData) {
        
        if(!jsonData)
            return fn(false);
        if(jsonData[0].username==req.body.username){
        	
        	var password_salt =  jsonData[0].password_salt;
        	var password_hash =  jsonData[0].password_hash;
        	hash(req.body.password,password_salt, function(err, hash_pass){
  	           
			    if (err) {
			    	
			    	console.log(err);
			    	return fn(false);
			    }
			    console.log("hash asal : %s ", password_hash);
			    console.log("salt asal : %s", password_salt);
			    console.log("Hasil check : %s", hash_pass);
			    
			    
			    if(password_hash == hash_pass){
			    	
			    	var arr_ret = new Array();
			    	var obj = {};
					obj['username'] = jsonData[0].username;
					obj['user_id']  = jsonData[0].id;
					arr_ret.push(obj);
			    	
			    	console.log("Password match");
			    	return fn(arr_ret);
			    }else{
			     
			    	console.log("Password did not match");
			        return fn(false);
			  
			    }
			});
        }
        else{
        	
        	console.log("Data not found");
        	return fn(false);
        }
    });

}


exports.check = function (req,hash, fn) {

   authenticate(req,hash, function(result){
  	
        if(result){
	
          req.session.regenerate(function(){
          
            req.session.username = result[0].username;
            req.session.user_id = result[0].id;
            return fn(true);
            
          });
          
        }
        else{
         
          return fn(false);
        }
    
  });
  
};

exports.seeding = function(req,hash,fn){

    var users = {
      tj: { name: 'ganjar' }
    };
    
    hash('ganjar', function(err, salt, hash){
    
        if (err) throw err;
         // store the salt & hash in the "db"
         users.tj.salt = salt;
         users.tj.hash = hash;
      
         console.log( users.tj.salt + "End salt\n");
     
         /*Seeding db*/
      
         req.getConnection(function (err, connection) {
      
            var exape = {username:'ganjar',password_salt:users.tj.salt,password_hash:users.tj.hash};
            connection.query("INSERT INTO t_user set ? ",exape, function(err, rows){
      
	          if (err) {
	            
	          	  return fn(false,err); 
	          	   
	          }else{
	          	
	          	  return fn(true," Seeding's done");
	          }

	        });
        });
      
      
    
    }); //end of hash
   
   
};
