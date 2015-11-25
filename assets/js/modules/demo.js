/* ==========================================================================
	 Demo
	 ========================================================================== */

var Demo = (function() {

	var element = {};

	var init = function() {

		$('[data-demo-select]').chosen({
			width: '100%',
			disable_search: true
		}).change(function() {
			var $this = $(this),
					value = $this.val();

			$('[data-grid-modifier]')
				.removeClass('is-active');

			$('[data-grid-modifier="' + value + '"]')
				.addClass('is-active');
		});

	};

	return {
		init: init
	};

})();

$(document).ready(Demo.init);