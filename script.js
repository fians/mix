
;(function(w, $) {
	'use strict';

	var slice = 0;
	var sliceDone = 0;
	var loaderRunning = true;

	function spinLoader() {

		var el = $('#loading .spinner .slice'+slice);

		if (el.hasClass('done')) {
			return false;
		}

		el.addClass('colored');

		if (!loaderRunning) {
			el.addClass('done');
			sliceDone++;

			if (sliceDone === 6) {
				setTimeout(function() {
					$(document).trigger('loaderFinish');
				}, 600);
			}
		}

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

	function removeLoader(callback) {

		for (var a = 1; a < 7; a++) {

			(function(index) {
				var time = index*500;
				setTimeout(function() {
					$('#loading .spinner .slice'+index).addClass('removed');
					if (index === 6) {
						setTimeout(callback, 500);
					}
				}, time);
			})(a);
		}
	}

	function removeBackPart(callback) {
		$('#loading .back .wrapper').addClass('hide');
		$('#loading .back span').addClass('removed');
		return setTimeout(callback, 1000);
	}

	function openingAct() {
		$('#loading h1').addClass('disappear');
		$('#loading .spinner').addClass('centered');

		setTimeout(function() {
			return removeLoader(function() {
				removeBackPart(function() {
					$('#loading').addClass('hide');
				});
			});
		}, 500);
	}

	$('#loading .back span').css({
		width: $(document).width()/2,
		height: $(document).height()/2,
	});

	$(document).on('loaderFinish', openingAct);

	//spinLoader();

	setTimeout(function() {
		loaderRunning = false;
	}, 1000);

})(window, jQuery);