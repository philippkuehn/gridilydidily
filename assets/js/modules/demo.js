/* ==========================================================================
	 Demo
	 ========================================================================== */

var Demo = (function() {

	var element = {};

	var init = function() {

		$('[data-demo]').each(function() {

			$(this).on('click', '[data-demo-button]', function() {

				var $button = $(this),
						$demo = $button.closest('[data-demo]'),
						value = $button.attr('data-demo-button');

				$demo
					.find('[data-demo-button]')
					.removeClass('is-active');

				$button
					.addClass('is-active');

				$demo
					.find('[data-grid-modifier]')
					.removeClass('is-active');

				$demo
					.find('[data-grid-modifier="' + value + '"]')
					.addClass('is-active');

			});

		});

	};

	return {
		init: init
	};

})();

$(document).ready(Demo.init);