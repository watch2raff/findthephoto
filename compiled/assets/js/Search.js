var Search = (function() {
	var $resultBlock = $(".js-result");
	var $resultPhoto = $resultBlock.find(".js-resultPhoto");
	var $resultList = $(".js-resultList");
	var $favorites =  $(".js-favorites");
	var $favoritesChild =  $favorites.find(".js-favoritesList");
	var requestUrl = "https://api.vk.com/method/photos.search?";
	var paramsVersion = "5.50";
	var numberPhoto = 10;
	var templateResultList = $("#templateResultList").html();
	var photoArray = [];
	var start = 0;
	var end = numberPhoto;
	var styleClass = {
		hidden: "is-hidden",
		wide: "is-wide"
	};

	var init = function() {
		initFirstState();
		handlerSubmitForm();
		handlerScroll();
	};

	var initFirstState = function() {
		if(!$favoritesChild.children().length){
			$favorites.addClass(styleClass.hidden);
			$resultPhoto.addClass(styleClass.wide);
		}
	};

	var clearResultList = function() {
		$resultList.html('');
	};

	var showResultBlock = function() {
		$resultBlock.removeClass(styleClass.hidden);
	};

	var preparationData = function(isScrollLoad) {
		if(isScrollLoad){
			start += numberPhoto;
			end += numberPhoto
		}

		renderResultList(photoArray.slice(start, end));
	};

	var renderResultList = function(renderItems) {
		$resultList.append(_.template(templateResultList)({items: renderItems}));
	};

	var getPhoto = function(value) {
		start = 0;
		end = numberPhoto;

		jQuery.ajax({
			url: requestUrl,
			type: "GET",
			crossDomain: true,
			dataType: "jsonp",
			data: {
				q: value,
				v: paramsVersion
			},
			beforeSend: function() {
				Preloader.show();
			},
			success: function(response){
				if(response.response.items.length){
					clearResultList();
					showResultBlock();
					photoArray = response.response.items;
					preparationData();
				}else{
					Notification.show("error");
				}
			},
			error: function() {
				Notification.show("error");
			},
			complete: function() {
				Preloader.hide();
			}
		});
	}

	var handlerSubmitForm = function() {
		$(".js-search")
			.off("submit")
			.on("submit", function(e){
				e.preventDefault();

				var $item = $(this);
				var $input = $item.find(".js-searchInput");

				getPhoto($input.val());

				return false;
			});
	};

	var handlerScroll = function() {
		$(window).on("scroll.js-search", function(e){

			if (window.pageXOffset !== undefined) {
				if($(window).scrollTop() + $(window).height() === $(document).height()) {
					preparationData(true);
				}
			}
		});
	};

	return {
		init: init
	}
})();