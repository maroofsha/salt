(function ($) {
	'use strict';

	/* ///// Template Helper Function ///// */

	$.fn.hasAttr = function(attribute) {
		var obj = this;

		if (obj.attr(attribute) !== undefined) {
			return true;
		} else {
			return false;
		}
	};

	function checkVisibility (object) {
		var el = object[0].getBoundingClientRect(),
			wHeight = $(window).height(),
			scrl =  wHeight - (el.bottom - el.height),
			condition = wHeight + el.height;

		if (scrl > 0  && scrl < condition) {
			return true;
		} else {
			return false;
		}
	};

	// Scroll Events
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};
	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	};

	function preventDefaultForScrollKeys(e) {
	    if (keys[e.keyCode]) {
	        preventDefault(e);
	        return false;
	    }
	};

	function disableScroll() {
		if (window.addEventListener) window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;
	};

	function enableScroll() {
		if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null;
		window.onwheel = null;
		window.ontouchmove = null;
		document.onkeydown = null;
	};

	var teslaThemes = {
		init: function () {
			/* --------- Default Functions --- */
			this.stickyHeader();
			this.checkInputsForValue();
			this.nrOnlyInputs();
			this.slickInit();
			this.parallaxInit();
			this.tabsInit();
			this.googleMaps();

			/* --------- Custom Functions --- */
			this.toggles();
			this.isotopeInit();
		},

		/* ///// Template Custom Functions ///// */

		/* ----- Theme Default Functions ----- */

		stickyHeader: function () {
			if ($('.main-header').hasClass('sticky')) {
				$(window).on('scroll', function () {
					var st = $(this).scrollTop();

					if (st > $('.main-header').outerHeight(true)) {
						$('.main-header').addClass('fixed');
					} else {
						$('.main-header').removeClass('fixed');
					}
				});
			}
		},

		checkInputsForValue: function () {
			$(document).on('focusout', '.check-value', function () {
				var text_val = $(this).val();
				if (text_val === "" || text_val.replace(/^\s+|\s+$/g, '') === "") {
					$(this).removeClass('has-value');
				} else {
					$(this).addClass('has-value');
				}
			});
		},

		nrOnlyInputs: function () {
			$('.nr-only').keypress(function (e) {
				if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
					return false;
				}
			});
		},

		slickInit: function () {
			// Get All Carousels from the page
			var carousel = $('.tt-carousel');

			// Get All Sliders from the page
			var slider = $('.tt-slider');

			// Init Carousels
			carousel.each(function () {
				var obj = $(this),
					items = obj.find('.carousel-items');

				items.slick({
					focusOnSelect: obj.hasAttr('data-focus-on-select') ? obj.data('focus-on-select') : false,
					speed: obj.hasAttr('data-speed') ? obj.data('speed') : 450,
					slidesToShow: obj.hasAttr('data-items-desktop') ? obj.data('items-desktop') : 4,
					arrows: obj.hasAttr('data-arrows') ? obj.data('arrows') : true,
					dots: obj.hasAttr('data-dots') ? obj.data('dots') : true,
					infinite: obj.hasAttr('data-infinite') ? obj.data('infinite') : false,
					slidesToScroll: obj.hasAttr('data-items-to-slide') ? obj.data('items-to-slide') : 1,
					initialSlide: obj.hasAttr('data-start') ? obj.data('start') : 0,
					asNavFor: obj.hasAttr('data-as-nav-for') ? obj.data('as-nav-for') : '',
					centerMode: obj.hasAttr('data-center-mode') ? obj.data('center-mode') : false,
					vertical: obj.hasAttr('data-vertical') ? obj.data('vertical') : false,
					responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: obj.hasAttr('data-items-small-desktop') ? obj.data('items-small-desktop') : 3,
                                slidesToScroll: obj.hasAttr('data-items-small-desktop') ? obj.data('items-small-desktop') : 3
                            }
                        },
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: obj.hasAttr('data-items-tablet') ? obj.data('items-tablet') : 2,
                                slidesToScroll: obj.hasAttr('data-items-tablet') ? obj.data('items-tablet') : 2
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: obj.hasAttr('data-items-phone') ? obj.data('items-phone') : 2,
                                slidesToScroll: obj.hasAttr('data-items-phone') ? obj.data('items-phone') : 2
                            }
                        }
                    ]
				});
			});

			// Init Sliders
			slider.each(function () {
				var obj = $(this),
					items = obj.find('.slides-list');

				items.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					focusOnSelect: obj.hasAttr('data-focus-on-select') ? obj.data('focus-on-select') : false,
					autoplay: obj.hasAttr('data-autoplay') ? obj.data('autoplay') : false,
					autoplaySpeed: obj.hasAttr('data-autoplay-speed') ? obj.data('autoplay-speed') : 2000,
					pauseOnHover: obj.hasAttr('data-pause-on-hover') ? obj.data('pause-on-hover') : true,
					fade: obj.hasAttr('data-fade') ? obj.data('fade') : false,
					dots: obj.hasAttr('data-dots') ? obj.data('dots') : true,
					speed: obj.hasAttr('data-speed') ? obj.data('speed') : 500,
					arrows: obj.hasAttr('data-arrows') ? obj.data('arrows') : true,
					infinite: obj.hasAttr('data-infinite') ? obj.data('infinite') : false,
					initialSlide: obj.hasAttr('data-start') ? obj.data('start') : 0,
					asNavFor: obj.hasAttr('data-as-nav-for') ? obj.data('as-nav-for') : ''					
				});
			});
		},

		parallaxInit: function () {
			var container = $('[data-parallax-bg]');

			if (container.length) {
				container.each(function(index) {
					var boxImg = container.eq(index),
						boxImgData = boxImg.data('parallax-bg'),
						parallaxBox = boxImg.find('.box-img > span');

					parallaxBox.css({
						'background-image': 'url("' + boxImgData + '")'
					});

					function parallaxEffect () {
						var elCont = container[index],
							el = elCont.getBoundingClientRect(),
							wHeight = $(window).height(),
							scrl =  wHeight-(el.bottom - el.height),
							scrollBox = boxImg.find('.box-img'),
							condition = wHeight+el.height,
							progressCoef = scrl/condition;

						if( scrl > 0  && scrl < condition) {
							scrollBox.css({
								transform: 'translateY('+(progressCoef * 100)+'px)'
							});
						}
					}

					parallaxEffect();

					$(window).scroll(function() {
						parallaxEffect();
					});
				});
			}
		},

		tabsInit: function () {
			var tabs = $('.tabed-content');

			tabs.each(function () {
				var tab = $(this),
					option = tab.find('.tabs-header .tab-link'),
					content = tab.find('.tab-item');

				option.on('click', function () {
					var obj = $(this);

					if (!obj.hasClass('current')) {
						option.removeClass('current');
						obj.addClass('current');

						if (tabs.hasClass('gallery-tabs')) {
							tab.addClass('switching');

							setTimeout(function () {
								content.removeClass('current');
								$('#' + obj.data('tab-link')).addClass('current');

								tabs.removeClass('switching');
							}, 1795);
						} else {
							content.removeClass('current');
							$('#' + obj.data('tab-link')).addClass('current');
						}
					}
				});
			});
		},

		accordionInit: function () {
			var accordion = $('.accordion-group');

			accordion.each(function () {
				var accordion = $(this).find('.accordion-box');

				accordion.each(function () {
					var obj = $(this),
						header = $(this).find('.box-header h4'),
						body = $(this).find('.box-body');

					header.on('click', function () {
						if (obj.hasClass('open')) {
							body.velocity('slideUp', {
								duration: 150,
								complete: function () {
									obj.removeClass('open');
								}
							});
						} else {
							obj.addClass('open');
							body.velocity('slideDown', {duration: 195});
						}
					});
				});
			});
		},

		googleMaps: function () {
			// Describe Google Maps Init Function
			function initialize_contact_map (customOptions) {
                var mapOptions = {
                        center: new google.maps.LatLng(customOptions.map_center.lat, customOptions.map_center.lon),
                        zoom: parseInt(customOptions.zoom),
                        scrollwheel: false,
                        disableDefaultUI: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                var contact_map = new google.maps.Map($('#map-canvas')[0], mapOptions),
                    marker = new google.maps.Marker({
                        map: contact_map,
                        position: new google.maps.LatLng(customOptions.marker_coord.lat, customOptions.marker_coord.lon),
                        animation: google.maps.Animation.DROP,
                        icon: customOptions.marker,
                    });
            }

            if ($('#map-canvas').length) {
            	var customOptions = $('#map-canvas').data('options');
                google.maps.event.addDomListener(window, 'load', initialize_contact_map(customOptions));
            }
		},

		/* ----- Theme Specific Functions ----- */

		toggles: function () {
			/* ------ Search Form Toggle --- */
			$('.main-header .search-form-toggle').on('click', function () {
				$('.main-header .main-search-form').addClass('open');

				return false;
			});

			$(document).on('click', function (e) {
				if (!$(e.target).closest('.main-search-form').length || $(e.target).hasClass('close-form-toggle'))
					$('.main-header .main-search-form').removeClass('open');
			});

			/* ------ Mobile Menu Toggle --- */
			$('.mobile-menu-toggle').on('click', function () {
				$('body').toggleClass('mobile-menu-visible');
				return false;
			});

			$('body').on('click', function (e) {
				if (!$(e.target).closest('.header-menu-container').length || $(e.target).parent().is('.close-mobile-menu') || $(e.target).is('.close-mobile-menu'))
					$('body').removeClass('mobile-menu-visible');
			});

			/* ------ Hide Mobile Dropdowns --- */
			function hideMobileDrowpDowns () {
				$('.main-nav li.menu-item-has-children > a').each(function () {
					var obj = $(this);
					if ($(window).width() < 992) {
						obj.next().hide();
					}
				});
			}
			hideMobileDrowpDowns();
			$(window).on('resize.whatever', function () {
				hideMobileDrowpDowns();
			});

			/* ------ Toggle Dropdowns --- */
			$('.main-nav li.menu-item-has-children > a').on('click', function (e) {
				if ($(window).width() < 992) {
					e.preventDefault();
					var obj = $(this);
					$(window).off('.whatever');
					obj.toggleClass('active');
					obj.next().slideToggle(225);
				}
			});
		},

		isotopeInit: function () {
			var isotopeContainer = $('.isotope-container'),
				defaultSelection = isotopeContainer.data('default-selection');

			// Isotope Init
			isotopeContainer.imagesLoaded(function () {
				isotopeContainer.isotope({
					filter: defaultSelection,
					itemSelector: '.isotope-item'
				});
			});

			// Isotope Filters
			$('.filter-block .filter-item a').on('click', function () {
				$('.filter-block .filter-item').removeClass('current');
				$(this).parent().addClass('current');

				var selector = $(this).attr('data-item');
					isotopeContainer.isotope({
						filter: selector,
						animationOptions: {
						    duration: 945,
						    easing: 'linear',
						    queue: false
						}
					});
				return false;
			});
		}
	};

	$(document).ready(function () {
		teslaThemes.init();

		setTimeout(function () {
			$('body').addClass('dom-ready');
		}, 300);
	});
}(jQuery));
