function set_offer_data(offer_id) {
	console.log(offer_id);
}

const path_split = window.location.pathname.split("/");
path_split.shift();

if (path_split[0] == "offer") {
	set_offer_data(path_split[1]);
}