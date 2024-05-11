// import required frameworks etc.
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

// start the content delivery server
function start_cdn(HOSTNAME, PORT)
{
	// declare the cdn server
	const cdn = new Elysia();
	cdn.use(cors()); // use cors

	// return user profile picture
	cdn.get("/profile/:id", (request) => {
		// get user id from the parameters
		const user_id = request.params.id;
		return user_id;
	});

	// return an offer's attached images
	cdn.get("/offer/:seller/:offer", (request) => {
		// get the seller and offer id's from parameters
		const seller_id = request.params.seller;
		const offer_id = request.params.offer;
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