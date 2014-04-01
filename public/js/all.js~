/*JUST EN EXAMPLE OF JS, you can either remove this file or Modify
======================================================================*/
var BASE_URL;
if (!window.location.origin)
     window.location.origin = window.location.protocol+"//"+window.location.host;
     
BASE_URL = window.location.origin;


/*User Module JS*/
$(function(){
        
    $("#sort-by").change(function(){
    
        var t_val = $(this).val();
        window.location.href = BASE_URL+'/users?f='+t_val+'&q='+CURR_SEARCH+'&page='+CURR_PAGE;
    });
    
    
    $("#go-search").on("click keyup",function(){
              
        var t_val = $("#search-field").val();
        window.location.href =BASE_URL+'/users?f='+CURR_FILT+'&q='+t_val+'&page='+CURR_PAGE;
       
    });
    
   
    $("#search-field" ).on("keydown", function(event) {
       
        if(event.which == 13){ 
             var t_val = $("#search-field").val();
             event.preventDefault(); //it doesnt work without this line
             window.location.href =BASE_URL+'/users?f='+CURR_FILT+'&q='+t_val+'&page='+CURR_PAGE;
        }
    });
    
   
});//end of document raeady
