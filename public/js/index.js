

$(document).ready(function(){
	var toggle = false;
	$('.txtthere').hide();

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
			$('.scrollup').fadeOut();
			}
		});

		$('.scrollup').click(function () {
			$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	$('.deletepost').click(function(){
		$(this).parent().hide(200);
	});

	$('.toggle').click(function() {
		if ( !toggle ) {
			$(this).addClass('rotate');
			$('.txtthere').show(500);
			$('.toggletxt').hide(100);
			toggle = true;
		}
		else {
			$(this).removeClass('rotate');
			$('.txtthere').hide(100);			
			$('.toggletxt').show(500);
			$('.txtthere').val('');
			toggle = false;
		}
	});
});