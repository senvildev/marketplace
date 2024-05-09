PAGE_Y_OFFSET = window.scrollY;

document.addEventListener("scrollend", (event) => {
	const new_page_y_offset = window.scrollY;

	show_header(
		new_page_y_offset > PAGE_Y_OFFSET ? true : false
	);

	PAGE_Y_OFFSET = new_page_y_offset;
})