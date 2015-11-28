jQuery(document).ready(function($) {

	// global vars
	$doc = $(document),
	$win = $(window),
	$html = $('html'),
	$body = $('body'),
	$htmlBody = $('html, body'),
	breakpoint = {
		'x-small':   350,
		'small':     600,
		'medium':    800,
		'large':     1000,
		'x-large':   1400,
		'xx-large':  1800
	},
	isMobile = false;

	// simple mobile detection
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$html.addClass('is-mobile');
		isMobile = true;
	} else {
		$html.addClass('is-desktop');
		isMobile = false;
	}

});