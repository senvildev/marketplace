async function delete_offer_func() {
    const offer_id = path_split[1];
    const data = new FormData();
    data.append("full_cookie", localStorage.getItem("cookie"));
    const check_cookie = await simple_fetch("/check_cookie", "POST", data);
    if (check_cookie) {
        const delete_data = new FormData();
        delete_data.append("full_cookie", localStorage.getItem("cookie"));
        const delete_offer = await simple_fetch(`/delete_offer/${offer_id}`, "POST", delete_data);
        if (delete_offer && delete_offer == "success")
            window.location.pathname = "/home";
        else return 0;
    }
}

async function set_offer_data(offer_id) {
	const offer_data = await simple_fetch(`/offer_data/${offer_id}`, "GET", undefined);

    if (offer_data) {
        document.title = offer_data.title + " - marketplace";
        offer_title.innerHTML = offer_data.title;
        offer_price.innerHTML = price_format(offer_data.price);
        offer_date.innerHTML = date_format(offer_data.date);
        offer_city.innerHTML = offer_data.city;
        offer_description.innerHTML = offer_data.description;

        offer_thumnbail_image.style.backgroundImage = `url(${
            await fetch_cdn(`/offer_thumbnail/${offer_id}`, "GET")
        })`;
        offer_thumnbail_image.style.backgroundPosition = "center";
        offer_thumnbail_image.style.backgroundSize = "cover";

        offer_username.innerHTML = `(${offer_data.author})`;
        offer_username.href = `/profile/${offer_data.author}`;
        const first_name = await simple_fetch(`/get_firstname/${offer_data.author}`, "GET");
        if (first_name != "failure") {
            offer_author.innerHTML = first_name.first_name;
        } else window.location.pathname = "/home";

        // check cookie
        const data = new FormData();
        data.append("full_cookie", localStorage.getItem("cookie"));
        const check_cookie = await simple_fetch("/check_cookie", "POST", data);
        if (check_cookie) {
            delete_offer.style.display = "block";
            delete_offer.href = "#";
        }

    } else window.location.pathname = "/home";
}

const path_split = window.location.pathname.split("/");
path_split.shift();

if (path_split[0] == "offer") {
	set_offer_data(path_split[1]);
}