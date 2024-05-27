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

function save_cookie(database : EZDB, username : string, cookie : string) {

}

function check_cookie(database : EZDB, username : string, cookie : string) {
	const results : object[] = database.find_values("cookies", ["id"], undefined, "order by id desc");
	console.log(results);
}

export {
	create_cookie, save_cookie,
	check_cookie
}
