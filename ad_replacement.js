function get_localstorage_URLs(){
	chrome.extension.sendMessage({method: "get_correct_images"}, function(response){
		localStorage["image_URLs"] = response.image_URLs;
	});
}

function replace_all_ads(){
	get_localstorage_URLs()
	// Ads on the side of the page
	var side_ads = document.getElementsByClassName("ego_column");
	for (var i=0; i<side_ads.length; i++){
		replace_ad(side_ads[i]);
	}
	// And in the actual newsfeed
	var stories = document.getElementsByClassName("userContentWrapper");
	for (var i=0; i<stories.length; i++){
		var story = stories[i];
		var ad = story.getElementsByClassName("uiStreamAdditionalLogging");
		if (ad.length > 0) {
			replace_ad(story);
		}
	}
	// The big one you get when you log out
	var logged_out_ads = document.getElementsByClassName("loggedOutAuxLinks");
	for (var i=0; i<logged_out_ads.length; i++){
		ad = logged_out_ads[i];
		replace_ad(ad.parentNode);
	}
}

function replace_ad(ad_story){
	// Pick a random picture and replace the ad with it
	var img_url = pick_img();
	var replaced_story = swap_image(ad_story, img_url);
	// Click a to swap a new one in
	replaced_story.onclick = function() { this.src = pick_img(); }
}

function pick_img(){
	var img_URLs = JSON.parse(localStorage["image_URLs"]);
	var image_index = Math.round(Math.random() * (img_URLs.length - 1));
	var img_URL = img_URLs[image_index];
	return img_URL;
}

function swap_image(ad_story, img_URL){
	var ad_height = ad_story.clientHeight;
	var ad_width = ad_story.clientWidth;
	var new_img = document.createElement("img");
	new_img.src = img_URL;
	new_img.height = ad_height;
	new_img.width = ad_width;
	ad_story.parentNode.replaceChild(new_img, ad_story);
	return new_img;
}

// Possibly make this a whole thing that checks if it's still enabled
// and grabs the right pictures if it is, each time, before swapping ads
replace_all_ads();
document.addEventListener("scroll", replace_all_ads);
