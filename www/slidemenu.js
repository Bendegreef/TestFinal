$(document).ready(function () {

	$('.menu_icon').click(function () {
		$('.slidemenu').panel("open");
		$('.close').slideDown();
	});

	$('.close').click(function () {
		$('.slidemenu').hide('slide', {
			direction: 'left'
		}, 200);
		$('.close').slideUp();
	});

	$(document).on('pageinit', function() {
		
		$('body').on("swipeleft", function() {
			$('.slidemenu').panel("open");
		});
	
	})

});