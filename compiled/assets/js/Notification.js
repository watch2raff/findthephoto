var Notification = (function() {
	var $notification = $(".js-notification");
	var $notificationText = $(".js-notificationText");
	var prefixClass = "notification--";
	var paramText = {
		error: "Попробуйте ещё раз"
	};

	var hide = function (status) {
		$notification
			.removeClass(prefixClass + status)
			.removeClass(prefixClass + "show");
	};
	
	var show = function (status) {
		$notification
			.addClass(prefixClass + status)
			.addClass(prefixClass + "show");

		$notificationText.text(paramText[status]);

		setTimeout(function(){
			hide(status);
		}, 2000);
	};

	return {
		show: show
	}
})();