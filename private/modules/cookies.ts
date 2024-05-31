import {
	EZDB
} from "../libraries/ezdb/index";

import {
	COOKIE_CHARS, COOKIE_LENGTH
} from "../../config.json";

function create_cookie() {
	let cookie : string = "";
	for (let i = 0; i < COOKIE_LENGTH; i++)
		cookie += COOKIE_CHARS[Math.floor(Math.random() * COOKIE_CHARS.length)]
	return cookie;
}

function check_cookie(database : EZDB, full_cookie : string, username? : string) : boolean {
    const separate_cookie = full_cookie.split("$$$");
    let use_username : string;
    
    if (username)
        use_username = username;
    else use_username = separate_cookie[0];

    const cookie = separate_cookie[1];

    const check_cookie : any = database.find_values("cookies", ["cookie"],
        { "user like": [use_username, ""] },
        "order by id desc"
    );
    const latest_cookie = check_cookie[0].cookie;
    return cookie == latest_cookie;
}

export {
	create_cookie, check_cookie
}
