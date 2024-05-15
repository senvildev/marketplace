// import required frameworks etc
import { file } from "bun";
import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";

// middleware
import { no_caching } from "./middleware/no-caching";

// start the webserver
function start_webserver(HOSTNAME : string, PORT : number)
{
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

	// return the product page
	webserver.get("/offer/:offer_id", ({ params: { offer_id }}) => {
		// get the offer id
		// if the offer id is correct
		if (offer_id) {
			// check if the offer exists
			const offer_exists : boolean = true;
			// return the product file if exists
			if (offer_exists)
				return file("public/offer.html")
			else return 404;
		} else return 404; // otherwise doesn't exist
	}, { params: t.Object({ offer_id: t.Numeric() }) });

	// return the error's code if an error occurs
	webserver.onError(({ code }) => code);
	// listen on the parsed hostname and port
	webserver.listen({ hostname: HOSTNAME, port: PORT });

	// print the address of the webserver if it was created successfully
    if (webserver) console.log(`[!] started webserver on http://${HOSTNAME}:${PORT}/`);
}

// export the main function
export { start_webserver }