function get_localstorage_URLs(){
	chrome.extension.sendMessage({method: "get_corgi_URLs"}, function(response){
		localStorage["corgi_URLs"] = response.corgi_URLs;
	});
}

function corgi_cover(){
	var side_ads = document.getElementsByClassName("ego_column");
	for (var i=0; i<side_ads.length; i++){
		corgi_attack(side_ads[i]);
	}

	var stories = document.getElementsByClassName("uiUnifiedStory");
	for (var i=0; i<stories.length; i++){
		var story = stories[i];
		var ad = story.getElementsByClassName("uiStreamAdditionalLogging");
		if (ad.length > 0) {
			corgi_attack(story);
		}
	}
}

function corgi_attack(ad_story){
	// Don't replace an ad over and over
	if (!ad_story.hasAttribute("corgified")){
		// Mimic ad properties
		var ad_height = ad_story.clientHeight;
		var ad_width = ad_story.clientWidth;

		// Pick a random corgi picture
		var corgi_URLs = JSON.parse(localStorage["corgi_URLs"]);
		var image_index = Math.round(Math.random() * (corgi_URLs.length - 1));
		var corgi_img_URL = corgi_URLs[image_index];

		// Create the corgi picture on the page
		var corgi_img = document.createElement("img");
		corgi_img.src = corgi_img_URL;
		corgi_img.height = ad_height;
		corgi_img.width = ad_width;
		ad_story.parentNode.replaceChild(corgi_img, ad_story);
		ad_story.setAttribute("corgified", "true");
	}
}

get_localstorage_URLs();
corgi_cover();
document.addEventListener("scroll", corgi_cover);