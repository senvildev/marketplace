async function login() {
    const username = login_username.value.trim();
    const password = login_password.value.trim();

    if (
        username != "" && password != "" &&
        username.split(" ").length == 1 &&
        password.split(" ").length == 1
    ) {
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);
        const response = await simple_fetch("/login", "POST", data);
        if (response && response != "failure") {
            localStorage.setItem("cookie", `${username}$$$${response}`)
            window.location.pathname = "/home";
        }
    }
}

async function register() {
    const username = register_username.value.trim();
    const first_name = register_firstname.value.trim();
    const password = register_password.value.trim();

    if (
        username != "" && password != "" && first_name != "" &&
        username.split(" ").length == 1 &&
        password.split(" ").length == 1 &&
        first_name.split(" ").length == 1
    ) {
        const data = new FormData();
        data.append("username", username);
        data.append("first_name", first_name);
        data.append("password", password);
        const response = await simple_fetch("/register", "POST", data);
        if (response && response != "failure") {
            localStorage.setItem("cookie", `${username}$$$${response}`)
            window.location.pathname = "/home";
        }
    }
}

let CURRENT_FORM = "login";

function finish() {
    if (CURRENT_FORM == "login")
        login()
    else register();
}

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