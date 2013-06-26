function get_localstorage_URLs(){
	chrome.extension.sendMessage({method: "get_corgi_URLs"}, function(response){
		localStorage["corgi_URLs"] = response.corgi_URLs;
	});
}

function corgi_cover(){
	// Ads on the side of the page
	var side_ads = document.getElementsByClassName("ego_column");
	for (var i=0; i<side_ads.length; i++){
		corgi_attack(side_ads[i]);
	}
	// And in the actual newsfeed
	var stories = document.getElementsByClassName("uiUnifiedStory");
	for (var i=0; i<stories.length; i++){
		var story = stories[i];
		var ad = story.getElementsByClassName("uiStreamAdditionalLogging");
		if (ad.length > 0) {
			corgi_attack(story);
		}
	}
	// The big one you get when you log out
	var logged_out_ads = document.getElementsByClassName("loggedOutAuxLinks");
	for (var i=0; i<logged_out_ads.length; i++){
		ad = logged_out_ads[i];
		corgi_attack(ad.parentNode);
	}
}

function corgi_attack(ad_story){
	// Pick a random corgi picture and replace the ad with it
	var corgi_img_URL = pick_corgi();
	var corgi_story = place_corgi(ad_story, corgi_img_URL);
	// Click a corgi to swap a new one in
	corgi_story.onclick = function() { this.src = pick_corgi(); }
}

function pick_corgi(){
	var corgi_URLs = JSON.parse(localStorage["corgi_URLs"]);
	var image_index = Math.round(Math.random() * (corgi_URLs.length - 1));
	var corgi_img_URL = corgi_URLs[image_index];
	return corgi_img_URL;
}

function place_corgi(ad_story, corgi_img_URL){
	var ad_height = ad_story.clientHeight;
	var ad_width = ad_story.clientWidth;
	var corgi_img = document.createElement("img");
	corgi_img.src = corgi_img_URL;
	corgi_img.height = ad_height;
	corgi_img.width = ad_width;
	ad_story.parentNode.replaceChild(corgi_img, ad_story);
	return corgi_img;
}

get_localstorage_URLs();
corgi_cover();
document.addEventListener("scroll", corgi_cover);
