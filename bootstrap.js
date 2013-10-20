// Corgis enabled on install
chrome.runtime.onInstalled.addListener(function(details){
	localStorage["enable_extension"] = true;
	localStorage["use_corgis"] = true;
	localStorage["use_custom"] = false;
	if (localStorage["custom_URLs"] === undefined)
		localStorage["custom_URLs"] = JSON.stringify([]);
	corgi_generator.get_corgis();
});

// Inject ad-replacing code on Facebook
chrome.tabs.onUpdated.addListener(function(id, info, tab){
	if (tab.url.toLowerCase().indexOf("facebook.com") !== -1){
		if (localStorage["enable_extension"] == "true")
			chrome.tabs.executeScript(null, {"file": "ad_replacement.js"});
	}
});

// Listen for the request to pass localStorage and other messages
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if (request.method == "get_correct_images"){
		var custom_url_length = JSON.parse(localStorage["custom_URLs"]).length
		if (localStorage["use_custom"] == "true" && custom_url_length > 0)
			sendResponse({image_URLs: localStorage["custom_URLs"]});
		else
			sendResponse({image_URLs: localStorage["corgi_URLs"]});
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