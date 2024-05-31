// functions used across the site

// show/hide the header
function show_header(bool)
{
	// if hide, then hide, if show, then show, duh
	header_element.style.transform = `translateY(${
		bool ? -Number(
			getComputedStyle(document.documentElement)
				.getPropertyValue("--header-height").split("px")[0]
		) : 0
	}px)`;
}

// global simpler fetch
async function simple_fetch(pathname, http_method, data) {
	const url = `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT}${pathname}`;
	const fetch_res = await fetch(url, {
		method: http_method,
		body: data
	});
    const content_type = fetch_res.headers.get("content-type");
    let response;
    if (content_type.includes('application/json'))
        response = await fetch_res.json();
    else if (content_type.includes('text/plain'))
        response = await fetch_res.text();
    else if (content_type.includes('text/html'))
        response = await fetch_res.text();

    if (content_type.includes('text/plain') || content_type.includes('text/html')) {
        const number = Number(response);
        if (!isNaN(number)) {
            response = number;
        }
    }

	return response;
}

// global cdn fetch
async function fetch_cdn(pathname, http_method) {
    const url = `${window.location.protocol}//${window.location.hostname}:${CDN_PORT}${pathname}`;
    const fetch_res = await fetch(url, {
        method: http_method
    });
    const response = await fetch_res.blob();
    if (response && response.type == "image/png") {
        const src = URL.createObjectURL(response);
        if (src != "")
            return src;
        else return "";
    }
    return "";
}

function price_format(price) {

    const full = String(price).split(".")[0].split("").reverse().join("")
        .replace(/(...)(?!$)/g, "$1 ").split("").reverse().join("");
    let fract = String(price).split(".")[1] != undefined ? "," + String(price).split(".")[1] : "";
    if (fract != "" && Number(String(price).split(".")[1]) * 10 < 100)
        fract += "0";

    return `${full}${fract} zł`;
}

function date_format(date) {
    const split_date = date.split("-");
    return `${
        split_date[2][0] == "0" ? split_date[2][1] : split_date[2]
    } ${MONTHS[Number(split_date[1]) - 1]} ${split_date[0]}`;
}

function search(query) {
    location = `/search?q=${encodeURIComponent(query)}`;
}