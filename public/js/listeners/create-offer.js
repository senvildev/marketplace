thumbnail_button.onclick = () => {
    thumbnail_input.click();
}

submit_button.onclick = () => {
    create_offer();
}

thumbnail_input.onchange = () => {
    if (thumbnail_input.files.length > 1) {
        thumbnail_input.files = [];
    } else {
        thumbnail_showcase.innerHTML = "";
        thumbnail_showcase.style.backgroundImage = `url(${URL.createObjectURL(thumbnail_input.files[0])})`;
        thumbnail_showcase.style.backgroundPosition = "center";
        thumbnail_showcase.style.backgroundSize = "cover";
    }
}