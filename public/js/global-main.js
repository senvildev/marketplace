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

// replace all svg images with svg elements
async function replace_img_svg()
{
	const svg_images = document.querySelectorAll("img#svg-image");
	for (const element of svg_images)
	{
		const parent = element.parentElement;
		const image_source = element.src;

		const svg_element_temp = document.createElement("svg");
		const svg_data = await fetch(image_source);
		const parsed_svg_data = await svg_data.text();
		svg_element_temp.innerHTML = parsed_svg_data;
		const svg_element = svg_element_temp.childNodes[0];
		console.log(svg_element)

		element.replaceWith(svg_element);
	}
}
replace_img_svg();