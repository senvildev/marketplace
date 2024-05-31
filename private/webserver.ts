// import required frameworks etc
import { file } from "bun";
import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { EZDB } from "./libraries/ezdb/index";

// middleware
import { no_caching } from "./middleware/no-caching";

// start the webserver
function start_webserver(HOSTNAME : string, PORT : number)
{
    // open the db
    const database : EZDB = new EZDB("database.sqlite3");

	// declare the webserver
	const webserver : Elysia = new Elysia();

	webserver.use(cors()); // use cors
	webserver.use(no_caching(webserver)); // disable caching

	// declare the static folder
	webserver.use(staticPlugin({ assets: 'public', prefix: '' }));

	// redirect the user to /home if they just put the link in
	webserver.get("/", () => Response.redirect("/home"));
	// return the page files
	webserver.get("/home", () => file("public/home.html"));
	webserver.get("/login", () => file("public/login.html"));

    // create offer page
    webserver.get("/create_offer", () => {
        return file("public/create-offer.html");
    });

    // return profile page
    webserver.get("/profile/:profile_id", ({ params : { profile_id }}) => {
        if (profile_id) {
            const profile : object[] = database.find_values("users", ["username"], {"username like": [String(profile_id), ""]});
            const profile_exists : boolean = profile.length == 1 ? true : false;
            if (profile_exists)
                return file("public/profile.html");
            else return 404;
        } else return 404;
    }, { params: t.Object({ profile_id : t.String({ error() { return "profile_id must be a string" }}) }) });

	// return the product page
	webserver.get("/offer/:offer_id", ({ params: { offer_id }}) => {
		// get the offer id
		// if the offer id is correct
		if (offer_id) {
			// check if the offer exists
            const offer : object[] = database.find_values(
                "offers", ["id"],
                {"id like": [String(offer_id), "AND"], "deleted =": ["0", ""]}
            );
			const offer_exists : boolean = offer.length == 1 ? true : false;
			// return the product file if exists
			if (offer_exists)
				return file("public/offer.html")
			else return 404;
		} else return 404; // otherwise doesn't exist
	}, { params: t.Object({ offer_id: t.Numeric({ error() { return "offer_id must be a number" } }) }) });

    webserver.get("/search", () => {
        return file("public/search.html");
    });

	// return the error's code if an error occurs
	webserver.onError(({ code }) => code);
	// listen on the parsed hostname and port
	webserver.listen({ hostname: HOSTNAME, port: PORT });

	// print the address of the webserver if it was created successfully
    if (webserver) console.log(`[!] started webserver on http://${HOSTNAME}:${PORT}/`);
}

// export the main function
export { start_webserver }