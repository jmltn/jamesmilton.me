(function($) {
	var $window = $(window),
		$body = $('body'),
		$featured = $('#featured-slider');

	$(document).ready(function() {

		// Hidden sections
		$('#show-sidebar, #hide-sidebar').on('click', function (e) {
			$body.toggleClass('sidebar--opened');
			e.preventDefault();
		});
		$('#site-overlay').on('click', function(e){
			$body.removeClass('sidebar--opened search--opened');
			searchField.clear();
			e.preventDefault();
		});

		// Featured carousel
		$featured.slick({
			autoplay: true,
			arrows : true,
			dots : false,
			fade : true,
			appendArrows : $('.featured-nav'),
			prevArrow : $('.featured-prev'),
			nextArrow : $('.featured-next')
		});
		$featured.fadeIn(600, function(){
			$featured.parents().removeClass('slider-loading');
		});

		// Back to top button
		$('#top-link').on('click', function(e) {
			$('html, body').animate({'scrollTop': 0});
			e.preventDefault();
		});
		$window.scroll(function () {
			if ( $(this).scrollTop() > 600 ) {
				$body.addClass('is--scrolled');
			} else {
				$body.removeClass('is--scrolled');
			}
		});

		// Responsive videos
		$('.post').fitVids();

		// Image adjustments
		if ( $body.hasClass( 'post-template' ) || $body.hasClass( 'page-template' ) ) {
			adjustImages();
		}

		// Grid layout
		if ( $.isFunction( $.fn.masonry ) && $('#post-wrapper').length ) {
			gridLayout.refresh();
		}

	});

	$window.on('debouncedresize', onResize);

	var gridLayout = (function() {
		var $container = $('#post-wrapper'),
			$items = $container.children().addClass('post--loaded'),
			initialized = false,
			init = function() {
				$container.imagesLoaded(function() {
					$container.masonry({
						itemSelector: '.post',
						columnWidth: '.post',
						transitionDuration: 0
					});
					setTimeout(function() {
						$container.masonry('layout');
					}, 100);
					showItems($items);
					initialized = true;
				});
			},
			refresh = function() {
				if (!initialized) {
					init();
					return;
				}
				$container.masonry('layout');
			},
			showItems = function($items) {
				$items.each(function(i, obj) {
					var $postInside = $(obj).find('.post-inside');
					animatePost($postInside, i * 100);
				});
			},
			animatePost = function($postInside, delay) {
				setTimeout(function() {
					$postInside.addClass('is--visible');
				}, delay);
			};
		return {
			init: init,
			refresh: refresh
		}
	})();

	function onResize() {
		if ( $body.hasClass( 'post-template' ) || $body.hasClass( 'page-template' ) ) {
			adjustImages();
		}
		if ( $.isFunction( $.fn.masonry ) && $('#post-wrapper').length ) {
			gridLayout.refresh();
		}
	}


	var prefix = '';
	var skills = [
	    'Designer',
	    'Developer',
			'Snowboarder',
			'Creator',
			'Some other lame noun'
	].map(function (s) { return s; });
	var delay = 10;
	var step = 1;
	var tail = 5;
	var timeout = 75;
	var p1 = document.getElementById('para1');
	var colors = [
	    "#f26a79",
	    "#18a5b7",
	    "#f7e88a"
	];
	function getRandomColor() {
	    return colors[Math.floor(Math.random() * colors.length)];
	}
	function getRandomChar() {
	    return String.fromCharCode(Math.random() * (127 - 33) + 33);
	}
	function getRandomColoredString(n) {
	    var fragment = document.createDocumentFragment();
	    for (var i = 0; i < n; i++) {
	        var char = document.createElement('span');
	        char.textContent = getRandomChar();
	        char.style.color = getRandomColor();
	        fragment.appendChild(char);
	    }
	    return fragment;
	}
	/** Global State */
	var kye = {
	    text: ' ',
	    prefixP: -tail,
	    skillI: 0,
	    skillP: 0,
	    direction: 'forward',
	    delay: delay,
	    step: step,
	};
	function render() {
	    var skill = skills[kye.skillI];
	    if (kye.step) {
	        kye.step--;
	    }
	    else {
	        kye.step = step;
	        if (kye.prefixP < prefix.length) {
	            if (kye.prefixP >= 0) {
	                kye.text += prefix[kye.prefixP];
	            }
	            kye.prefixP++;
	        }
	        else {
	            if (kye.direction === 'forward') {
	                if (kye.skillP < skill.length) {
	                    kye.text += skill[kye.skillP];
	                    kye.skillP++;
	                }
	                else {
	                    if (kye.delay) {
	                        kye.delay--;
	                    }
	                    else {
	                        kye.direction = 'backward';
	                        kye.delay = delay;
	                    }
	                }
	            }
	            else {
	                if (kye.skillP > 0) {
	                    kye.text = kye.text.slice(0, -1);
	                    kye.skillP--;
	                }
	                else {
	                    kye.skillI = (kye.skillI + 1) % skills.length;
	                    kye.direction = 'forward';
	                }
	            }
	        }
	    }
	    p1.textContent = kye.text;
	    p1.appendChild(getRandomColoredString(kye.prefixP < prefix.length ?
	        Math.min(tail, tail + kye.prefixP) :
	        Math.min(tail, skill.length - kye.skillP)));
	    setTimeout(render, timeout);


	}
	setTimeout(render, 500);

	var instagramFeed = new Instafeed({
	    get: 'user',
	    limit: 6,
	    resolution: 'standard_resolution',
	    userId: '441902919',
	    accessToken: '441902919.1677ed0.ab9040eff64249dcbfb19b6d48b4e909',
	    template:
	      '<div class="instagram-item"><a href="{{link}}" title="{{caption}}" aria-label="{{caption}}" target="_blank"><img src="{{image}}"></a></div>'
	  });

	if ($('#instafeed').length) {
	    instagramFeed.run();
    }

})(jQuery);
