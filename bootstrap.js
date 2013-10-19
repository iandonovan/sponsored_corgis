// Corgis enabled on install
chrome.runtime.onInstalled.addListener(function(details){
	localStorage["enable_extension"] = true;
	localStorage["use_corgis"] = true;
	localStorage["use_custom"] = false;
	corgi_generator.get_corgis();
});

chrome.tabs.onUpdated.addListener(function(id, info, tab){
	chrome.tabs.executeScript(null, {"file": "save_custom_image.js"})
	if (tab.url.toLowerCase().indexOf("facebook.com") !== -1){
	// Inject code to replace ads
		if (localStorage["enable_extension"] == "true")
			chrome.tabs.executeScript(null, {"file": "ad_replacement.js"});
	}
});

// Listen for the request to pass localStorage
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if (request.method == "get_correct_images"){
		if (localStorage["use_corgis"] == "true")
			sendResponse({image_URLs: localStorage["corgi_URLs"]});
		else
			sendResponse({image_URLs: localStorage["custom_URLs"]});
	}
});

// Adapted from Google Chrome Extension doc/tutorial
// https://developer.chrome.com/extensions/examples/tutorials/getstarted/popup.js
var corgi_generator = {
	flickrURL_: 'https://secure.flickr.com/services/rest/?' +
	'method=flickr.photos.search&' +
	'api_key=e593ebe2004ea4c1fb56a112a908d65e&' +
	'text=' + encodeURIComponent('corgi') + '&' +
	'safe_search=1&' +
	'content_type=1&' +
	'sort=interestingness-desc&' +
	'per_page=300',

	get_corgis: function() {
		var req = new XMLHttpRequest();
		req.open("GET", this.flickrURL_, true);
		req.onload = this.storePhotos_.bind(this);
		req.send(null);
	},

	storePhotos_: function(e) {
		var corgis = e.target.responseXML.querySelectorAll('photo');
		urls = [];
		for (var i = 0; i< corgis.length; i++) {
			url = this.makeCorgiURL_(corgis[i]);
			urls.push(url);
		}
		localStorage["corgi_URLs"] = JSON.stringify(urls);
	},

	makeCorgiURL_: function(pic) {
		return "http://farm" + pic.getAttribute("farm") +
		".static.flickr.com/" + pic.getAttribute("server") +
		"/" + pic.getAttribute("id") +
		"_" + pic.getAttribute("secret") +
		".jpg";
	}
};