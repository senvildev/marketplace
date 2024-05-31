async function load_profile_data() {
    const profile_data = await simple_fetch(`/get_user_data/${path[1]}`, undefined);
    if (profile_data.length == 2) {
        const user_data = profile_data[0][0];
        const offers_data = profile_data[1];

        profile_username.innerHTML = user_data.username;
        profile_first_name.innerHTML = user_data.first_name;
        profile_available.innerHTML = offers_data.length;
        profile_date.innerHTML = date_format(user_data.creation_date);

        show_offers(offers_data, "home", available_offers_list);
    } else location = "/home";
}

async function check_access_cookie() {
    const data = new FormData();
    data.append("full_cookie", localStorage.getItem("cookie") != undefined ? localStorage.getItem("cookie") : "");
    const check_cookie = await simple_fetch("/check_cookie", "POST", data);
    if (check_cookie) {
        logout_button.style.display = "block";
    }
}

const path = window.location.pathname.split("/");
path.shift();

if (path[0] == "profile") {
    check_access_cookie();
    load_profile_data();
}