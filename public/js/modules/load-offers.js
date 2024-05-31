async function show_offers(OFFERS, offer_page, wrapper)
{
	const offer_data = ["title", "price", "city", "date"]
	for (const offer_id in OFFERS)
	{
		const offer = OFFERS[offer_id];
		const offer_div = document.createElement("div");
		offer_div.id = offer.id;
		offer_div.classList = `offer ${offer_page}`;

		const offer_image_wrapper = document.createElement("div");
		offer_image_wrapper.classList.add("offer-image");
        const source = await fetch_cdn(`/offer_thumbnail/${offer.id}`, "GET", undefined);
        if (source != "") {
            offer_image_wrapper.style.backgroundImage = `url(${source})`;
            offer_image_wrapper.style.backgroundPosition = "center";
            offer_image_wrapper.style.backgroundSize = "cover";
            // offer_image.style.width = "auto"; offer_image.style.height = "100%";
        }
        offer_image_wrapper.onclick = () => {
			window.location.pathname = `/offer/${offer.id}`;
		};
		
		const offer_image = document.createElement("img");
        // const source = await fetch_cdn(`/offer_thumbnail/${offer.id}`, "GET", undefined);
        // if (source != "") {
        //     offer_image.src = source
        //     offer_image.style.width = "auto"; offer_image.style.height = "100%";
        // }

		const data_wrapper_div = document.createElement("div");
		data_wrapper_div.classList.add("data-wrapper");
		
		const offer_data_div = document.createElement("div");
		offer_data_div.classList.add("offer-data");
        offer_data_div.onclick = () => {
			window.location.pathname = `/offer/${offer.id}`;
		};

		for (const data of offer_data)
		{
			const data_div = document.createElement("div");
			data_div.classList.add(`offer-${data}`);

			const data_text = document.createElement("p");
			data_text.classList.add(data);
			if (data == "price")
				data_text.innerHTML = price_format(offer[data]);
			else if (data == "date") {
				// yyyy-mm-dd format
				data_text.innerHTML = date_format(offer[data]);
			} else data_text.innerHTML = offer[data];

			data_div.appendChild(data_text);
			offer_data_div.appendChild(data_div);
		}

		// const offer_bookmark_button_wrapper = document.createElement("div");
		// offer_bookmark_button_wrapper.classList.add("offer-button");

		// const bookmark_wrapper = document.createElement("div");
		// bookmark_wrapper.classList.add("bookmark");
		// bookmark_wrapper.addEventListener("onclick", () => {
			// console.log("click");
		// });

		// const bookmark_svg = new DOMParser().parseFromString(
			// await get_svg_html("/src/bookmark.svg"), "text/xml"
		// ).querySelector("svg");;

		// image
		offer_div.appendChild(offer_image_wrapper);
		offer_image_wrapper.appendChild(offer_image);

		// data
		data_wrapper_div.appendChild(offer_data_div);
		offer_div.appendChild(data_wrapper_div);

		// bookmark
		// bookmark_wrapper.appendChild(bookmark_svg);
		// offer_bookmark_button_wrapper.appendChild(bookmark_wrapper);
		// data_wrapper_div.appendChild(offer_bookmark_button_wrapper);

		// offer div
		wrapper.appendChild(offer_div);


	}
}


async function load_offers(type, page, wrapper) {
    const offers = await simple_fetch(`/${type}`, "GET", undefined);
    show_offers(offers, page, wrapper);
}
