// import required frameworks etc.
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

// start the content delivery server
function start_cdn(HOSTNAME : string, PORT : number)
{
	// declare the cdn server
	const cdn : Elysia = new Elysia();
	cdn.use(cors()); // use cors

	// return user profile picture
	cdn.get("/profile/:user_id", ({ params: { user_id }}) => {
		return user_id;
	});

	// return an offer's attached images
	cdn.get("/offer/:seller_id/:offer_id", ({ params: { seller_id, offer_id }}) => {
		// get the seller and offer id's from parameters
		return seller_id + " " + offer_id;
	});

	// listen on the parsed port and hostname
	cdn.listen({ port: PORT, hostname: HOSTNAME });

	// print out the address if it started successfully
	if (cdn) console.log(`[!] started CDN on http://${HOSTNAME}:${PORT}/`);
}

// export the main function
export {
	start_cdn
}