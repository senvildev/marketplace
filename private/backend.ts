import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

import { EZDB } from "./libraries/ezdb/index";

import { DATABASE_STRUCTURE } from "../config.json";
import { check_cookie, create_cookie } from "./modules/cookies";
import { write } from "bun";

interface RegisterData {
	username : string,
	first_name: string,
	password : string
}

interface LoginData {
	username : string,
	password: string
}

interface CheckCookieData {
    full_cookie : string,
    username? : string
}

interface GetOffersQuery {
    q : string
}

interface CreateOfferData {
    full_cookie : string,
    title : string,
    description : string,
    price : number,
    city : string,
    thumbnail : Blob
}

interface DeleteOfferData {
    full_cookie : string
}
interface DeletionParams {
    offer_id : string
}

function get_ymd_date() : string {
    const date : Date = new Date();
    const year : number = date.getUTCFullYear();
    const month : number = date.getUTCMonth() + 1;
    const day : number = date.getUTCDate();
    return `${year}-${
        month < 10 ? `0${month}` : month
    }-${day < 10 ? `0${day}` : day}`;
}

// create a backend server
function start_backend(HOSTNAME : string, PORT : number)
{
	// declare the backend
	const backend : Elysia = new Elysia();
	const database : EZDB = new EZDB("database.sqlite3");
    database.prepare_settings({ foreign_keys: "ON" });
    database.prepare_database(DATABASE_STRUCTURE)

	backend.use(cors()); // use cors

	backend.post("/register", ({ body } : { body : RegisterData }) => {
		const username : string = body.username;
		const first_name : string = body.first_name;
		const password : string = body.password;
        // console.log(username + " " + first_name + " " + password)

		if (username && first_name && password) {
			const check_existence : object[] = database.find_values("users", ["username"], { "username like": [username, ""] });
			if (check_existence.length == 0) {
				const cookie = create_cookie();
                const date = get_ymd_date();

				database.add_values("users", [{
					username: username,
					first_name: first_name,
					password: password,
                    creation_date: date
				}]);
				database.add_values("cookies", [{
					cookie: cookie,
					user: username
				}]);

				return cookie;
			}
			return "failure";
		}

		return "failure";
	});
	
	backend.post("/login", ({ body } : { body : LoginData }) => {
		const username : string = body.username;
		const password : string = body.password;

		if (username && password) {
			const get_password : any = database.find_values("users", ["password"], { "username like": [username, ""] });
            // console.log(get_password)
			if (get_password.length > 0 && get_password[0].password == password) {
				const new_cookie : string = create_cookie();
				database.add_values("cookies", [{
					cookie: new_cookie,
					user: username
				}]);
				return new_cookie;
			}

			return "failure";
		}

		return "failure";
	});

    backend.post("/check_cookie", ({ body } : { body : CheckCookieData }) => {
        const full_cookie : string = body.full_cookie;

        try {
            let check_cookie_res : boolean;
            if (body.username != undefined) {
                check_cookie_res = check_cookie(database, full_cookie, body.username);
            } else {
                check_cookie_res = check_cookie(database, full_cookie);
            }

            if (check_cookie_res)
                return 1;
            else return 0;

        } catch (error) { return 0; }

        // return [0];
    });

    backend.post("/create_offer", async ({ body } : { body : CreateOfferData }) => {
        // const json_data : CreateOfferData = JSON.parse(body);
        const full_cookie : string = body.full_cookie;

        if (full_cookie) {
            const check_cookie_res : boolean = check_cookie(database, full_cookie);
            if (check_cookie_res) {
                const split_cookie : string[] = full_cookie.split("$$$");

                const offer_title : string = body.title;
                const offer_author : string = split_cookie[0];
                const offer_description : string = body.description;
                const offer_price : number = body.price;
                const offer_city : string = body.city;
                const offer_date : string = get_ymd_date();

                const latest_id : any = database.add_values("offers", [{
                    title: offer_title,
                    description: offer_description,
                    author: offer_author,
                    price: offer_price,
                    date: offer_date,
                    city: offer_city
                }], true);

                const offer_thumbnail : Blob = body.thumbnail;
                write(`private/cdn/thumbnails/${latest_id.latest}.png`, offer_thumbnail);

                return "success";
            }
            return "failure";
        }
        return "failure";
    });

    backend.post("/delete_offer/:offer_id", ({ body, params: { offer_id } } : { body : DeleteOfferData, params : DeletionParams }) => {
        const full_cookie : string = body.full_cookie;
        const valid_cookie = check_cookie(database, full_cookie);
        if (valid_cookie) {
            const username : string = full_cookie.split("$$$")[0];
            const check_offer_existence = database.find_values(
                "offers", ["id"],
                { "author like": [username, "AND"], "id like": [offer_id, "AND"], "deleted =": ["0", ""] }
            );
            if (check_offer_existence.length == 1) {
                database.change_values(
                    "offers", {"deleted": "1"},
                    {"author like": [username, "AND"], "id like": [offer_id, ""]}
                );
                return "success";
            } else return "failure";
        } else return "failure";
    }, { params: t.Object({ offer_id: t.Numeric({ error() { return "offer_id must be a number" } }) }) });

    backend.get("/offer_data/:offer_id", ({ params: { offer_id }}) => {
        if (offer_id) {
            const offer_data = database.find_values(
                "offers", ["id, title, description, price, date, author, city"],
                { "id like": [String(offer_id), "AND"], "deleted =": ["0", ""] }
            );
            if (offer_data.length > 0) {
                return offer_data[0]
            } else return 404;
        }
    }, { params: t.Object({ offer_id: t.Numeric({ error() { return "offer_id must be a number" } }) }) });

    backend.get("/promoted_offers", () => {
        const promoted_offers = database.find_values(
            "offers", ["id, title, price, date, city"],
            { "deleted =": ["0", ""]}, "order by random() limit 20"
        );
        if (promoted_offers) {
            return promoted_offers;
        }
        return "failure";
    });

    backend.get("/get_offers", ({ query } : { query : GetOffersQuery }) => {
        if (query.q) {
            const offers = database.find_values("offers",
                ["id, title, description, price, date, author, city"],
                { "title like ": [`%${query.q}%`, "AND"], "deleted =": ["0", ""]}, "order by id desc limit 30"
            );
            return offers;
        }
        return "failure";
    });

    backend.get("/get_firstname/:username", ({ params : { username }}) => {
        const first_name : object[] = database.find_values("users", ["first_name"], { "username like": [username, ""] });
        if (first_name.length > 0)
            return first_name[0];
        return "failure";
    }, { params: t.Object({ username: t.String({ error() { return "username must be a string" } }) }) });

    backend.get("/get_user_data/:username", ({ params: { username }}) => {
        const user_data : object[] = database.find_values(
            "users", ["username, first_name, creation_date"],
            { "username like": [username, ""] }
        );
        const user_offers : object[] = database.find_values(
            "offers", ["id, title, price, date, city"],
            { "author like": [username, "AND"], "deleted = ": ["0", ""] }
        );

        if (user_data && user_offers) {
            return [user_data, user_offers];
        } else return "failure";
    }, { params: t.Object({ username: t.String({ error() { return "username must be a string" } }) }) });

	// listen on the parsed port and hostname
	backend.listen({ port: PORT, hostname: HOSTNAME });

	// print out the address if the backend initialized successfully
	if (backend) console.log(`[!] started backend on http://${HOSTNAME}:${PORT}/`);
}

// export the function
export { start_backend }