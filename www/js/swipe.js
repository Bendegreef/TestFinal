
$(function () {
    $(document).swipe({
        //Generic swipe handler for all directions
        swipeRight: function () {
            $('.slidemenu').show('slide', {
                direction: 'left'
            });
            $('.menu_icon').addClass('open');
        }
    });

    $('.slidemenu').swipe({
        //Generic swipe handler for all directions
        swipeLeft: function () {
            $(this).hide('slide', {
                direction: 'left'
            });
            $('.menu_icon').removeClass('open');
        }
    });

});
