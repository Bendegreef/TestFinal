/* jshint
devel: true,
browser: true,
jquery: true
*/


/* --------------Naam-Event-------------------------- */


$(document).ready(function () {
    var inlogCode = localStorage.getItem('loginCode');
        jQuery.ajax({
                //type: 'GET',
                
                url: 'http://api.adaytoshare.be/1/platform/check_code?code=' + inlogCode,
                dataType: 'json',
                success: function(responseData){
                    
                    $('.naam_event').text(responseData.album_name);

                },
                error: function(responseData){  
                  alert("server niet beschikbaar");
                },
   
            }); 
});


/* -------------Ophalen tekstberichten------------*/
$(document).ready(function () {
    
var limiet = 5;
var offset = 0;
var liketeller = 0;
var code = localStorage.getItem('loginCode');    
ophalenBerichten(code, limiet, offset, liketeller);

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) { 
       offset += limiet;
       liketeller += limiet;
       ophalenBerichten(code, limiet, offset, liketeller);

   }
});


});


//------------------------- Berichten ophaal functie------------*/

var ophalenBerichten = function(code, limiet, offset, liketeller){
    // var messages = [];

        jQuery.ajax({
                type: 'GET',
                url: 'http://api.adaytoshare.be/1/guestbook/get_posts',
                data: {code: code, limit: limiet, offset: offset},
                dataType: 'json',
                success: function(responseData){
                    
                    window.responseData = responseData;          
                        
                    
                    
                for(var i =0; i < 5; i++){
                    var htmlString="";
                    htmlString += "<article>";
					htmlString += "<div class='triangle-message'>";
					htmlString += "<div class='arrow-right'></div>";
					htmlString += "</div>";
                    htmlString += "<p class='messagetime'>" + timeConverter(responseData.messages[i].timestamp) + "</p>";
                    htmlString += "<p class='messagename'>" + responseData.messages[i].from + "</p>";
                    htmlString += "<p class='ongepast_icon'>a</p>";
                    htmlString += "<p class='message'>" + responseData.messages[i].message + "</p>";
                    if(responseData.messages[i].photoURL !== "")
                        htmlString += "<img class='messagepicture' src='" + responseData.messages[i].photoURL +"' alt='afbeelding'>";
                    htmlString += "<img src='img/ADTSiconsheartnotliked.svg' alt='hartje voor likes' class='like-heart like-heart"+liketeller+"'>";
                    htmlString += "<p class='like-count like-count"+liketeller+"'>" + responseData.messages[i].likes + "</p>";
                    htmlString += "</article>";
                    $('#berichten').append(htmlString);
                    
                    likes(liketeller, responseData.messages[i].messageID);
                    liketeller ++;
                }

                    ongepast();
                },
                error: function(responseData){  
                  alert("server niet beschikbaar");

                },
   
            }); 
};


    
//http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
    if(min<10)
        min = '0' + min;
  var sec = a.getSeconds();
  var time = hour + ':' + min;
  return time;
}



//------------------------- Likes (wordt opgeroepen in de ajax call van: Ophalen tekstberichten------------*/
var likes = function(liketeller, messageID){   
    
     var counter = 0;

    $('.like-heart'+liketeller+'').click(function () {
        counter += 1;
        if (counter % 2 === 0) {
            $(this).animate({
                width: '0'
            }, 400, 'easeInOutCubic', function () {
                $(this).attr('src', 'img/ADTSiconsheartnotliked.svg');
            });
            $(this).animate({
                width: '18px'
            }, 500, 'easeOutBack');
            var like_count = $('.like-count'+liketeller+'').text();
            $('.like-count'+liketeller+'').text(parseInt(like_count)-1);
        }
        
        else {
            $(this).animate({
                width: '0'
            }, 400, 'easeInOutCubic', function () {
                $(this).attr('src', 'img/ADTSiconsheartliked.svg');
            });
            $(this).animate({
                width: '18px'
            }, 500, 'easeOutBack');
            var like_count = $('.like-count'+liketeller+'').text();
            $('.like-count'+liketeller+'').text(parseInt(like_count)+1);
            LikeSturenNaarServer(messageID);
        }

    });
};

//------------------------- ongepast (wordt opgeroepen in de ajax call van: Ophalen tekstberichten------------*/

var ongepast = function(){ 
    $('.ongepast_icon').click(function () {
        
        $('.gekleurdebalk').animate({
            height: '65px'
        }, 500, 'easeInOutCubic', function () {
            $('.gekleurdebalk ul').show("slide", {direction: 'down'}, 300, function() {$('.darken').animate({opacity: '1'});});
        });
    });
    
    $('.gekleurdebalk ul').click(function () {
        $('.gekleurdebalk').animate({
            height: '0.45em'
        }, 500, 'easeInOutCubic', function () {
            $('.gekleurdebalk ul').hide("slide", {direction: 'down'}, 300);
        });
        
        $('.darken').animate({opacity: '0'}, 1000);
    });

};




/* --------------Like opsturen naar de server-------------------------- */
   

function LikeSturenNaarServer(messageID){
        
        var code = localStorage.getItem('loginCode');
        var data = {code:code, messageID: "388"};
        var json1 = JSON.stringify(data);
 $.ajax({
     type: 'POST',
     url: "http://api.adaytoshare.be/1/platform/like?code=951951&messageID=388",
    // data: {code: code, messageID: messageID},
     data: json1,
   dataType:'json',
   success: function(responseData){
       alert('liked');
    },
   error: function(xhr, ajaxOptions, thrownError) {
      alert("fout bij het liken");
    }
 });
    }