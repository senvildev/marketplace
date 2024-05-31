async function create_offer() {
    const title = title_input.value.trim();
    let price = price_input.value.trim();
    const description = description_input.value.trim();
    const city = city_input.value.trim();
    const thumbnail = thumbnail_input.files[0];
    
    if (title != "" && price > 0 && description != "" && city != "" && thumbnail_input.files.length == 1) {
        price = Math.floor(Number(price) * 100) / 100;
    
        const cookie = localStorage.getItem("cookie");
        if (cookie == undefined || cookie.split("$$$") == undefined)
            return 0;

        const data = new FormData();
        data.append("title", title);
        data.append("price", price);
        data.append("description", description);
        data.append("city", city);
        data.append("full_cookie", cookie);
        data.append("thumbnail", thumbnail)

        const response = await simple_fetch("/create_offer", "POST", data);
        if (response && response == "success") {
            window.location.pathname = "/home";
        }
    }
}

async function check_cookie() {
    const data = new FormData();
    data.append("full_cookie", localStorage.getItem("cookie") != undefined ? localStorage.getItem("cookie") : "");
    const check = await simple_fetch("/check_cookie", "POST", data);
    if (!check)
        window.location.pathname = "/home";
}

document.body.onload = check_cookie;