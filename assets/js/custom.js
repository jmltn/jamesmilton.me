(function($) {
	var $window = $(window),
		$body = $('body'),
		$featured = $('#featured-slider');

	$(document).ready(function() {


		// Timeline show More
		var list = $(".listTimeline li");
	  var numToShow = 3;
	  var button = $("#next");
		var fade = $(".fade");
		var numInList = list.length;
	  list.hide();
	  if (numInList > numToShow) {
	    button.show();
	  }
	  list.slice(0, numToShow).show();

	  button.click(function () {
	    var showing = list.filter(":visible").length;
	    list.slice(showing - 1, showing + numToShow).fadeIn();
	    var nowShowing = list.filter(":visible").length;
	    if (nowShowing >= numInList) {
	      button.hide();
				fade.hide();
	    }
	  });


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
	    'Digital Designer',
	    '2D/3D Creator',
			'VR/AR specialist',
			'Video maker',
			'Snowboarder',
			'Guitarist',
			'Motion designer'
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


})(jQuery);

// Timeline
(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();
