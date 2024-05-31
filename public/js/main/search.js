async function get_offers_matching() {
    const parameters = new URLSearchParams(window.location.search);
    const params_object = Object.fromEntries(parameters.entries());

    if (params_object.q) {
        document.title = `wyniki dla "${params_object.q}" - marketplace`;
        title_p.innerHTML = `Wyniki wyszukiwania dla: ${params_object.q}`;
        const offers = await simple_fetch(
            `/get_offers?q=${encodeURIComponent(params_object.q)}`,
            "GET", undefined
        );
        show_offers(offers, "home", offers_list_wrapper_search);
    }
}

get_offers_matching();