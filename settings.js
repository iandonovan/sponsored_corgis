document.addEventListener('DOMContentLoaded', function(){
	var corgi_checkbox = document.getElementById("corgi_checkbox");
	var already_corgi = localStorage["enable_corgis"];

	if (already_corgi == "true")
		corgi_checkbox.checked = true;
	else
		corgi_checkbox.checked = false;

	corgi_checkbox.addEventListener("change", function(){
		localStorage["enable_corgis"] = corgi_checkbox.checked;
	})
});