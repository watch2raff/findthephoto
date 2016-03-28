var Favorites = (function() {
	var $favorites = $(".js-favorites");
	var $favoritesList = $favorites.find(".js-favoritesList");
	var $result = $(".js-result");
	var $resultPhoto = $(".js-resultPhoto");
	var styleClass = {
		hidden: "is-hidden",
		wide: "is-wide",
		moving: "is-animation"
	};

	var init = function() {
		handlerDragDrop();
		handlerButton();
	};

	var whichAnimationEvent = function(){
		var el = document.createElement("fakeelement");
		var animations = {
			"animation"      : "animationend",
			"OAnimation"     : "oAnimationEnd",
			"MozAnimation"   : "animationend",
			"WebkitAnimation": "webkitAnimationEnd"
		}

		for (var key in animations){
			if (el.style[key] !== undefined){
				return animations[key];
			}
		}
	}

	var hideFavorites = function() {
			$favorites.addClass(styleClass.hidden);
			$resultPhoto.addClass(styleClass.wide);
	}

	var countItemInFavorites = function() {
		return $favoritesList.children().length;
	};

	var appendToFavotites = function($parent) {
		$parent.removeClass(styleClass.moving);
		$favoritesList.append($parent);
	};

	var showFavorites = function($parent) {
		appendToFavotites($parent);
		$favorites.removeClass(styleClass.hidden);
		$resultPhoto.removeClass(styleClass.wide);
	};

	var handlerDragDrop = function() {
		var list =  document.getElementById("dragList");
		
		Sortable.create(list,{
			scroll: true
		});
	};

	var handlerButton = function() {
		$(document).on("click.js-favoritesButton", ".js-favoritesButton", function(){
			var $item = $(this);
			var $parent = $item.parent();
			var dataType = $item.data("type");

			$parent
				.addClass(styleClass.moving)
				.one(whichAnimationEvent(),
					function(event) {
						if(dataType === "add"){
							showFavorites($parent);
						}else{
							$parent.remove();
							if(!countItemInFavorites()){
								hideFavorites();
							}
						}
					}
				);
		});
	};

	return {
		init: init
	}
})();