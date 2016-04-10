

$(document).ready(function(){
	var toggle = false;
	$('.txtthere').hide();

	$('.toggle').click(function() {
		if ( !toggle ) {
			$(this).addClass('rotate');
			$('.txtthere').show(1000);
			toggle = true;
		}
		else {
			$(this).removeClass('rotate');
			$('.txtthere').hide(1000);
			toggle = false;
		}
	});
});