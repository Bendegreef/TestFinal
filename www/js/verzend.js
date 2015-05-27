/* jshint
devel: true,
browser: true,
jquery: true
*/

/* --------------Naam-Event + naam persoon-------------------------- */


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
        success: function (responseData) {

            $('.naam_event').text(responseData.album_name);
            $('.naam').text(naam);

        },
        error: function (responseData) {
            alert("server niet beschikbaar");
        },

    });
});

/* --------------verzenden via url ------------------------- */

$(document).ready(function () {
      document.getElementById("send_message").addEventListener("click", verzenden, false);

    function verzenden(){

        var message = $('.bericht').val();  
        var code = localStorage.getItem('loginCode');
        var from = $('.naam').text(); 
        var email = localStorage.getItem('email');
        var public_private = $('.public_private').text();
        var pb = 1;
        if(public_private == "privé")
            pb = 0;
        
        var data = {code:code,from:from, message: message};
        var json1 = JSON.stringify(data);
        var url = "http://api.adaytoshare.be/1/guestbook/post?code="+ code +"&from="+ from +"&message="+ message +"&public=" + pb;
        if(email != '')
            url = "http://api.adaytoshare.be/1/guestbook/post?code="+ code +"&from="+ from +"&message="+ message + "&email=" + email + "&public=" + pb;
        
 $.ajax({
   url: url,    // opsturen van data in het data veld lukt nog niet. Daarom moet het voorlopig via de url.
   type: 'POST',
   data:  json1,
    // contentType: "application/json",
   dataType:'json',
   success: function(responseData){
     //On ajax success do this
       //for (var key in responseData) {
                  //alert(key + ": " +responseData[key]);
                // }
       window.location = "timeline.html";
      },
   error: function(xhr, ajaxOptions, thrownError) {
      alert("fout bij het versturen");
    }
 });
    }
});


/* --------------verzenden via json parameters-------------------------- */
/*
$(document).ready(function () {
    document.getElementById("send_message").addEventListener("click", verzenden, false);

    function verzenden() {

        var message = $('.bericht').val();
        var inlogCode = localStorage.getItem('loginCode');
        var from = $('.naam').text();
        var email = localStorage.getItem('email');
        var public_private = $('.public_private').text();
        var pb = 1;
        if (public_private == "privé")
            pb = 0;

        $.ajax({
            url: 'http://api.adaytoshare.be/1/guestbook/post',
            headers: {"cache-control": "no-cache"},
            type: 'POST',
            cache: false,
           // data: 'code='+inlogCode+"&from="+from+"&message="+message,
            data: {code: inlogCode, from: from, message: message},
            //dataType:'json',
            success: function (responseData) {
                alert(inlogCode);
                for (var key in responseData) {
                    alert(key + ": " + responseData[key]);
                }
                window.location = "timeline.html";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("fout bij het versturen");
            }
        });
        
//        $.post( "http://api.adaytoshare.be/1/guestbook/post", { code: "951951", from: "Test", message: 'Hallo!' })
 // .done(function( data ) {
//    alert( "Data Loaded: ");
  //  for (var key in data) {
                   /* alert(key + ": " + data[key]);
                }
  });*/
   /* }
});*/