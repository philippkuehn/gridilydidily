/* ==========================================================================
	 Tabs
	 ========================================================================== */

var Tabs = (function() {

	var element = {};

	var init = function() {

		$('[data-tabs]').each(function() {

			var $container = $(this);

			$container.on('click', '[data-tabs-button]', function() {

				var $this = $(this),
						id = $this.attr('data-tabs-button');

				$container.find('[data-tabs-button]')
					.removeClass('is-active');

				$container.find('[data-tabs-button="' + id + '"]')
					.addClass('is-active');

				$container.find('[data-tabs-content]')
					.removeClass('is-active');

				$container.find('[data-tabs-content="' + id + '"]')
					.addClass('is-active');

				return false;

			});

		});

	};

	return {
		init: init
	};

})();

$(document).ready(Tabs.init);