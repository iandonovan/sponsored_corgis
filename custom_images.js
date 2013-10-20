function save_custom_image(info, tab){
	var custom_URLs = JSON.parse(localStorage["custom_URLs"]);
	custom_URLs.push(info.srcUrl);
	localStorage["custom_URLs"] = JSON.stringify(custom_URLs);
}

function delete_custom_image(info, tab){
	var custom_URLs = JSON.parse(localStorage["custom_URLs"]);
	var index_to_kill = custom_URLs.indexOf(info.srcUrl);
	custom_URLs.splice(index_to_kill, 1);
	localStorage["custom_URLs"] = JSON.stringify(custom_URLs);
}

function menu_on_click(info, tab){
	if (info.menuItemId == "save_image_menu")
		save_custom_image(info, tab);
	else if (info.menuItemId == "delete_image_menu")
		delete_custom_image(info, tab);
}

function make_buttons(){
	var parent_menu = chrome.contextMenus.create({
		"type": "normal",
		"id": "parent_menu",
		"title": "Sponsored Corgis",
		"contexts": ["image"],
	});

	var save_image_menu = chrome.contextMenus.create({
		"type": "normal",
		"title": "Save image",
		"id": "save_image_menu",
		"parentId": parent_menu,
		"contexts": ["image"],
	});

	var delete_image_menu = chrome.contextMenus.create({
		"type": "normal",
		"title": "Delete image",
		"id": "delete_image_menu",
		"parentId": parent_menu,
		"contexts": ["image"],
	});

	chrome.contextMenus.onClicked.addListener(menu_on_click);
}

make_buttons();