

$(document).ready(function(){
	var toggle = false;
	$('.txtthere').hide();

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