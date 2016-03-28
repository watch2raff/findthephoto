var Preloader = (function() {
	var $preloader = $(".js-preloader");
	var styleClass = {
		show: "preloader--show"
	};

	var hide = function (status) {
		$preloader.removeClass(styleClass.show);
	};

	var show = function (status) {
		$preloader.addClass(styleClass.show);
	};

	return {
		show: show,
		hide: hide
	}
})();