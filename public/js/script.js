(function($) { 
	"use strict";

	var userPicsSlider = '',
		userPicsSliderLoaded = false;

	function calculateHeight() {
		if ($('.product-block').length) {
			var height;

			$('.product-block').each(function() {
				var obj = $(this);

				setTimeout(function() {
					height = obj.find('.product-image').outerHeight(true) -
							 obj.find('.product-top').outerHeight(true) -
							 obj.find('.product-header').outerHeight(true) -
							 obj.find('.product-footer').outerHeight(true);

					obj.find('.product-desc').css('height', height);
					if (!obj.find('.product-desc').hasClass('ps-container')) {
						obj.find('.product-desc').perfectScrollbar();
					} else {
						obj.find('.product-desc').perfectScrollbar('update');
					}
				}, 300);
			});
		}
	}

	$(document).ready(function() {
		$(document).on('click', '.change-mode', function() {
			$(this).parent().toggleClass('member');
		});

		$(document).on('click', '.profile-container .profile-image', function() {
			$(this).toggleClass('empty');
		});

		$(document).on('click', '.product-info-tabs li', function() {
			if (!$(this).hasClass('active')) {
				$('.product-info-tabs li.active').removeClass('active');
				$(this).addClass('active');

				$('.product-sections-container > div.active').removeClass('active');
				$('.product-sections-container > div[data-tab="'+$(this).data('tab')+'"]').addClass('active');

				if ($(this).data('tab') == 'user-pics') {
					if (!userPicsSliderLoaded) {
						userPicsSliderLoaded  = true;

						userPicsSlider = new Swiper('.user-pics-slider', {
							slidesPerView 	: 4,
							spaceBetween 	: 30,

							breakpoints: {
								1024: {
									slidesPerView: 3,
									spaceBetween 	: 20
								},

								767: {
									slidesPerView: 1,
									spaceBetween 	: 0
								}
							}
						});
					}
					else {

					}
				}

				else if ($(this).data('tab') == 'review' && $(window).width() >= 768) {
					$('div[data-tab="review"]').perfectScrollbar();
				}

				else if ($(this).data('tab') == 'external-review' && $(window).width() >= 768) {
					$('div[data-tab="external-review"]').perfectScrollbar();
				}
			}
		});
	});

	$(window).load(function() {
		if ($(window).width() >= 768) {
			calculateHeight();
		}

		if ($('.product-sections-container').length && $(window).width() >= 768) {
			$('div[data-tab="review"]').perfectScrollbar();
		}

		if ($('.write-review-body').length) {
			$('.write-review-body').perfectScrollbar();
		}
	});

	$(window).resize(function() {
		if ($(window).width() >= 768) {
			calculateHeight();
		}
	});

	var lastScrollTop = 0;

	$(window).scroll(function() {
		var st = $(this).scrollTop();

		if (st < lastScrollTop) {
			if ($(window).scrollTop() < $('.search-container').offset().top ) {
				$('.search-container').removeClass('fixed');
			}

			$('.search-container-inner').addClass('show');
		}
		else {
			if (!$('.search-container').hasClass('fixed') && $(window).scrollTop() > $('.search-container').offset().top + $('.search-container').outerHeight() ) {
				$('.search-container').addClass('fixed');
			}

			$('.search-container-inner').removeClass('show');
		}

		lastScrollTop = st;
	});
	
})(jQuery);