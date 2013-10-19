document.addEventListener('DOMContentLoaded', function(){
	var enable_checkbox = document.getElementById("enable_checkbox");
	var radio_buttons = document.getElementById("radios");
	var corgi_radio = document.getElementById("use_corgis");
	var custom_radio = document.getElementById("use_custom");
	var already_on = localStorage["enable_extension"];
	var already_corgi = localStorage["use_corgis"];

	// Remember user's enabled state
	if (already_on == "true"){
		enable_checkbox.checked = true;
		radio_buttons.style.display = 'block';
	}
	else{
		enable_checkbox.checked = false;
		radio_buttons.style.display = 'none';
	}

	// Remember user's picture choice
	if (already_corgi == "true")
		corgi_radio.checked = true;
	else
		custom_radio.checked = true;

	// Hide radio buttons on disable, set enabled localstorage
	enable_checkbox.addEventListener("change", function(){
		localStorage["enable_extension"] = enable_checkbox.checked;
		if (enable_checkbox.checked)
			radio_buttons.style.display = 'block';
		else
			radio_buttons.style.display = 'none';
	});

	// Set picture choice localstorage
	radio_buttons.addEventListener("change", function(){
		if (document.getElementById("use_corgis").checked){
			localStorage["use_corgis"] = true;
			localStorage["use_custom"] = false;
		}
		else{
			localStorage["use_custom"] = true;
			localStorage["use_corgis"] = false;
		}
	});
});