/* jshint
devel: true,
browser: true,
jquery: true
*/

/* --------------Naam-Event + naam persoon + eventcode-------------------------- */


$(document).ready(function () {
    // var sendData = {url: 'http://api.adaytoshare.be/1/platform/check_code?code=' + inlogCode};
    var inlogCode = localStorage.getItem('loginCode');
    var naam = localStorage.getItem('naam');
        jQuery.ajax({
                //type: 'GET',
                
                url: 'http://api.adaytoshare.be/1/platform/check_code?code=' + inlogCode,
                //url: 'crosscall.php',
                //data: JSON.stringify({code:'951951'}),
                dataType: 'json',
            //data: sendData,
                success: function(responseData){
                    
                    
                    $('.naamlogout').text(naam);
                    $('.eventnaamlogout').text(responseData.album_name);
                    $('.eventcodelogout').text(inlogCode);

                },
                error: function(responseData){  
                  alert("server niet beschikbaar");
                },
   
            }); 
});


/* --------------Online platform en logout-------------------------- */

$(document).ready(function () {
      
    document.getElementById("onlineplatform").addEventListener("click", onlineplatform, false);
    document.getElementById("logoutbutton").addEventListener("click", logout, false);
    
    
    function onlineplatform(){
        //window.location = "http://ehb.adaytoshare.be/adts/guestbook";
        window.open("http://ehb.adaytoshare.be/adts/guestbook", '_system');
    }
    
    function logout(){
       // localStorage.removeItem('naam');
        //localStorage.removeItem('loginCode');
        //localStorage.removeItem('email');
        window.location = "index.html";
    }
    
});