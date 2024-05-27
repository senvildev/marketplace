import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

import { EZDB } from "./libraries/ezdb/index";

import { DATABASE_STRUCTURE } from "../config.json";
import { create_cookie } from "./modules/cookies";

interface RegisterData {
	username : string,
	first_name: string,
	password : string
}

interface LoginData {
	username : string,
	password: string,
	cookie : string
}

// create a backend server
function start_backend(HOSTNAME : string, PORT : number)
{
	// declare the backend
	const backend : Elysia = new Elysia();
	const database : EZDB = new EZDB("database.sqlite3",
		DATABASE_STRUCTURE, { foreign_keys: "ON" }
	);

	backend.use(cors()); // use cors

	backend.post("/register", ({ body } : { body : string }) => {
		const json_data : RegisterData = JSON.parse(body);
		const username : string = json_data.username;
		const first_name : string = json_data.first_name;
		const password : string = json_data.password;

		if (username && first_name && password) {
			const check_existence : object[] = database.find_values("users", ["username"]);
			if (check_existence.length == 0) {
				const cookie = create_cookie();

				database.add_values("users", [{
					username: username,
					first_name: first_name,
					password: password
				}]);
				database.add_values("cookies", [{
					cookie: cookie,
					user: username
				}]);

				return { "cookie": cookie };
			}
			return ["failure"];
		}

		return ["failure"];
	});
	
	backend.post("/login", ({ body } : { body : string }) => {
		const json_data : LoginData = JSON.parse(body);
		const username : string = json_data.username;
		const password : string = json_data.password;
		const cookie : string = json_data.cookie;

		if (username && password && cookie) {
			const latest_cookie : any = database.find_values("cookies", ["cookie"], { "user like": [username, ""] }, "order by id desc limit 1");
			const get_password : any = database.find_values("users", ["password"], { "username like": [password, ""] });
			const latest_cookie_str : string = latest_cookie[0].cookie;
			if (latest_cookie_str === cookie) {
				const new_cookie : string = create_cookie();
				database.add_values("cookies", [{
					cookie: new_cookie,
					user: username
				}]);
				return { cookie : new_cookie };
			}

			return ["failure"];
		}

		return ["failure"];
	});

	// listen on the parsed port and hostname
	backend.listen({ port: PORT, hostname: HOSTNAME });

	// print out the address if the backend initialized successfully
	if (backend) console.log(`[!] started backend on http://${HOSTNAME}:${PORT}/`);
}

// export the function
export { start_backend }