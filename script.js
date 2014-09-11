
;(function(w, $) {
	'use strict';

	var slice = 0;
	var loaderRunning = true;

	function spinLoader() {

		var el = $('#loading .spinner .slice'+slice);

		if (!el.length) {
			return false;
		}

		el.addClass('colored');

		slice++;
		if (slice === 7) {
			slice = 1;
		}

		setTimeout(function() {
			spinLoader(slice);
		}, 250);

		if (loaderRunning) {
			setTimeout(function() {
				el.removeClass('colored');
			}, 500);
		}
	}

	spinLoader();

	setTimeout(function() {
		loaderRunning = false;
	}, 10000);
})(window, jQuery);