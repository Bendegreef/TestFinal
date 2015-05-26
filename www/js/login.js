/* jshint
devel: true,
browser: true,
jquery: true
*/

//------------------LOGIN--------------------
$(document).ready(function () {
    document.getElementById("loginbutton").addEventListener("click", inloggen, false);

    function inloggen() {
        var inlogCode = $("#inputcode").val();
        var naam = $("#inputnaam").val();
        var email = $("#inputmail").val();
        localStorage.setItem('loginCode', inlogCode);
        localStorage.setItem('naam', naam);
        localStorage.setItem('email', email);
        jQuery.ajax({
            //type: 'GET',
            url: 'http://api.adaytoshare.be/1/platform/check_code?code=' + inlogCode,
            //url: 'crosscall.php',
            //data: JSON.stringify({code:'951951'}),
            dataType: 'json',
            //data: sendData,
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