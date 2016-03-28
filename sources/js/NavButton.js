var NavButton = (function() {
	var $navButton = $(".js-navButton");
	var styleCss = {
		hidden: "is-hidden"
	};

	var init = function() {
		handlerScrollWindow();
		handlerClickButton();
	};
	
	var showNavButton = function() {
		$navButton.removeClass(styleCss.hidden);
	};
	var hideNavButton = function() {
		$navButton.addClass(styleCss.hidden);
	};

	var handlerClickButton = function() {
		$navButton.on("click.js-navButton", function(){
			$('html, body').animate({ scrollTop: 0 }, 400);
			return false; 
		});
	};

	var handlerScrollWindow = function() {
		$(window).on("scroll.js-navButton", function(){

			if (window.pageXOffset !== undefined) { // All browsers, except IE9 and earlier
				if($(window).scrollTop() >= 500) {
					showNavButton();
				}else{
					hideNavButton();
				}
			}
		});
	};
	
	return {
		init: init
	}
})();