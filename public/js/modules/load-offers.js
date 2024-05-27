const OFFERS = {
	1: {
		title: "tytul produktu",
		price: 69420,
		city: "podlasie",
		date: "2001-09-11"
	},
	2: {
		title: "tytul produktu 2",
		price: 2137.55,
		city: "podlasie",
		date: "1970-01-01"
	}
}

async function show_offers(offer_page)
{
	const offer_data = ["title", "price", "city", "date"]
	for (const offer_id in OFFERS)
	{
		const offer = OFFERS[offer_id];
		const offer_div = document.createElement("div");
		offer_div.id = offer_id;
		offer_div.classList = `offer ${offer_page}`;
		offer_div.onclick = () => {
			window.location.pathname = `/offer/${offer_id}`;
		};

		const offer_image_wrapper = document.createElement("div");
		offer_image_wrapper.classList.add("offer-image");
		
		const offer_image = document.createElement("img");
		offer_image.innerHTML = "";

		const data_wrapper_div = document.createElement("div");
		data_wrapper_div.classList.add("data-wrapper");
		
		const offer_data_div = document.createElement("div");
		offer_data_div.classList.add("offer-data");

		for (const data of offer_data)
		{
			const data_div = document.createElement("div");
			data_div.classList.add(`offer-${data}`);

			const data_text = document.createElement("p");
			data_text.classList.add(data);
			if (data == "price")
				data_text.innerHTML =
					String(offer[data]).split(".")[0].split("").reverse().join("")
					.replace(/(...)(?!$)/g, "$1 ").split("").reverse().join("")
					+ `${
						String(offer[data]).split(".")[1] != undefined ? "," + String(offer[data]).split(".")[1] : ""
					} zł`;
			else if (data == "date") {
				// yyyy-mm-dd format
				const split_date = offer[data].split("-");
				data_text.innerHTML =
					`${
						split_date[2][0] == "0" ? split_date[2][1] : split_date[2]
					} ${MONTHS[Number(split_date[1]) - 1]} ${split_date[0]}`;
			} else data_text.innerHTML = offer[data];

			data_div.appendChild(data_text);
			offer_data_div.appendChild(data_div);
		}

		const offer_bookmark_button_wrapper = document.createElement("div");
		offer_bookmark_button_wrapper.classList.add("offer-button");

		const bookmark_wrapper = document.createElement("div");
		bookmark_wrapper.classList.add("bookmark");
		bookmark_wrapper.addEventListener("onclick", () => {
			console.log("click");
		});

		const bookmark_svg = new DOMParser().parseFromString(
			await get_svg_html("/src/bookmark.svg"), "text/xml"
		).querySelector("svg");;

		// image
		offer_div.appendChild(offer_image_wrapper);
		offer_image_wrapper.appendChild(offer_image);

		// data
		data_wrapper_div.appendChild(offer_data_div);
		offer_div.appendChild(data_wrapper_div);

		// bookmark
		bookmark_wrapper.appendChild(bookmark_svg);
		offer_bookmark_button_wrapper.appendChild(bookmark_wrapper);
		data_wrapper_div.appendChild(offer_bookmark_button_wrapper);

		// offer div
		offers_list_wrapper.appendChild(offer_div);


	}
}

show_offers("home");