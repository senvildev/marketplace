search_button.onclick = () => {
    let search_value = search_input.value;
    search_value = search_value.trim();
    if (search_value != "") {
        search(search_value);
    }
}