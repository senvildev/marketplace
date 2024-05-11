// main script used across the entire site

// override the global variable on launch
PAGE_Y_OFFSET = window.scrollY;

// when page is finished scrolling
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
})