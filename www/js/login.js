/* jshint
devel: true,
browser: true,
jquery: true
*/

//------------------LOGIN--------------------
$(document).ready(function () {
    
    $("input").change(function() {   //http://stackoverflow.com/questions/2455225/how-do-i-move-focus-to-next-input-with-jquery
        var inputs = $(this).closest('form').find(':input');
        inputs.eq( inputs.index(this)+ 1 ).focus();
    });
    
    document.getElementById("loginbutton").addEventListener("click", inloggen, false);

    function inloggen() {
        var inlogCode = $("#inputcode").val();
        var naam = $("#inputnaam").val();
        var email = $("#inputmail").val();
        localStorage.setItem('loginCode', inlogCode);
        localStorage.setItem('naam', naam);
        localStorage.setItem('email', email);
        jQuery.ajax({
            type: 'GET',
            //url: 'http://api.adaytoshare.be/1/platform/check_code?code=' + inlogCode,
            url: 'http://api.adaytoshare.be/1/platform/check_code', 
            data: {code: inlogCode},
            dataType: 'json',
            success: function (responseData) {


                window.responseData = responseData;

                //for (var key in responseData) {
                //  alert(key + ": " +responseData[key]);
                // }

                if (responseData.success == 1) {
                    if(naam == ''){
                    $("#inputnaam").val("");
                    $("#inputnaam").attr("placeholder", "Het is verplicht een naam in te vullen!!");
                    $('#inputnaam').addClass('rood_placeholder');
                    } else{
                        window.location = 'timeline.html';
                    }
                } else {
                    $("#inputcode").val("");
                    $("#inputcode").attr("placeholder", "U heeft een foute code ingegeven!!");
                    $('#inputcode').addClass('rood_placeholder');
                }
            },
            error: function (responseData) {
                alert("server niet beschikbaar");
            },

        });
    }
});



/* ---------------------------------------- */