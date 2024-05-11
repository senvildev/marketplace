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