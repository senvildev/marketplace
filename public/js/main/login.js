function login() {
	
}

let CURRENT_FORM = "login";

function switch_form()
{
	if (CURRENT_FORM == "login")
		login_form.style.marginLeft = "calc(-100% - 1px)";
	else login_form.style.marginLeft = "0%";

	CURRENT_FORM = CURRENT_FORM == "login" ? "register" : "login";
}

for (const switch_button of switch_form_buttons) {
	switch_button.addEventListener("mouseup", switch_form);
}