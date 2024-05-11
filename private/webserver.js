// import required frameworks etc
import { file } from "bun";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";

import { no_caching } from "./modules/middleware-functions";

// start the webserver
function start_webserver(HOSTNAME, PORT)
{
	// declare the webserver
	const webserver = new Elysia();

	webserver.use(cors()); // use cors
	webserver.use(no_caching(webserver)); // disable caching

	// declare the static folder
	webserver.use(staticPlugin({ assets: 'public', prefix: '' }));

	// redirect the user to /home if they just put the link in
	webserver.get("/", (request) => {
		return Response.redirect("/home");
	});
	
	// return the homepage file
	webserver.get("/home", (request) => {
		return file("public/home.html");
	});

	// return the product page
	webserver.get("/offer/:id", (request) => {
		// get the offer id
		const offer_id = request.params.id;

		// if the offer id is correct
		if (offer_id)
		{
			// check if the offer exists
			const offer_exists = true;
			// return the product file if exists
			if (offer_exists)
				return file("public/offer.html")
			else return 404;
		} else return 404; // otherwise doesn't exist
	});

	// return the error's code if an error occurs
	webserver.onError(({ code }) => {
		return code
	});

	// listen on the parsed hostname and port
	webserver.listen({ host: HOSTNAME, port: PORT });

	// print the address of the webserver if it was created successfully
    if (webserver) console.log(`[!] started webserver on http://${HOSTNAME}:${PORT}/`);
}

// export the main function
export {
    start_webserver
}