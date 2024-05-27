// functions used across the site

// show/hide the header
function show_header(bool)
{
	// if hide, then hide, if show, then show, duh
	header.style.transform = `translateY(${
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
		body: JSON.stringify(data)
	});
	const response = await fetch_res.json();
	return response;
}