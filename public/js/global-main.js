// main script used across the entire site

// override the global variable on launch
PAGE_Y_OFFSET = window.scrollY;

// when page is finished scrolling
if (!IGNORE_PATHS.includes(window.location.pathname))
{
	document.addEventListener("scroll", (event) => {
		// get the new Y offset of the document
		const new_page_y_offset = window.scrollY;
	
		// run the function to check whether the
		// header should hide or appear
		show_header(
			new_page_y_offset > PAGE_Y_OFFSET ? true : false
		);
	
		// override the global variable
		PAGE_Y_OFFSET = new_page_y_offset;
	});
}

// get svg data
async function get_svg_html(source)
{
	try {
		const svg_data = await fetch(source);
		const parsed_svg_data = await svg_data.text();
		return parsed_svg_data;
	} catch (error) {
		console.warn("[!!!] error getting svg image data")
	}
}


// replace all svg images with svg elements
async function replace_img_svg()
{
	const svg_images = document.querySelectorAll("img#svg-image");
	for (const element of svg_images)
	{
		const parent = element.parentElement;
		const image_source = element.src;

		const svg_element_temp = document.createElement("svg");
		const svg_data = await get_svg_html(image_source);
		svg_element_temp.innerHTML = svg_data;
		const svg_element = svg_element_temp.childNodes[0];

		element.replaceWith(svg_element);
	}
}

const PATH_DICTIONARY = {
	"saved-offers": "/saved_offers",
	"messages": ["/login", "/messages"],
	"user-profile": ["/login", "/profile"],
	"create-offer": ["/login", "/create_offer"]

}
function change_path(item_redirection)
{
	const value = PATH_DICTIONARY[item_redirection];
	if (typeof value === "object")
	{
		const check_cookie = false;
		window.location.pathname = value[check_cookie ? 1 : 0];
	} else window.location.pathname = value;
}

const BACKEND_PORT = 3000;
async function simple_fetch(path, method, body_data)
{
	const url = `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT}${path}`;
	console.log(url);
	const fetch = await fetch(url, {
			method: method,
			body: JSON.stringify(body_data)
		}
	);
}

replace_img_svg();