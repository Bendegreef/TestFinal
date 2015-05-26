/* jshint
devel: true,
browser: true,
jquery: true
*/
/* ---- Popup 'help' bij login ---- */
$(document).ready(function () {
    $('.more_info').click(function () {
        $('.wrapperhelp').show(0, function () {
            $('.help').fadeIn(500, function () {
                $('.helptekst').slideDown(500);
            });
        });
    });

    $('.closehelp').click(function () {
        $('.helptekst').slideUp(500, function () {
            $('.help').fadeOut(500, function () {
                $('.wrapperhelp').hide();
            });
        });
    });
});
/* ---------------------------------------- */


/*----- Pop up tekstinvoer - Publiek/private --------*/

$(document).ready(function () {

	$(".public_private").click(function () {
		$(".publiek-prive").fadeIn(300);
	});
	
	$(".li-popupprive, .li-popuppubliek, .publiek-prive, .wrapper ").click(function(){
		$(".publiek-prive").fadeOut(300);
	
	});
	
	$(".li-popupprive").click(function() {
		$(".public_private").text("privé");
	
	});
	
	$(".li-popuppubliek").click(function() {
		$(".public_private").text("publiek");
	
	});
 

});
  
/* ---------------------------------------- */


/* ---- Hamburger-menu animatie & Logout slide animatie  ---- */
$(document).ready(function () {
    var menuIcon = $('.menu_icon');

    $('.menu_icon').click(function () {
        if (menuIcon.hasClass('open')) {
            $('.slidemenu').hide('slide', {
                direction: 'left'
            });
            $('.menu_icon').removeClass('open');
        } else {
            $('.slidemenu').show('slide', {
                direction: 'left'
            });
            $('.menu_icon').addClass('open');
        }
    });
});

/* ---------------------------------------- */


