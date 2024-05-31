import { write, file } from "bun";

// import required frameworks etc.
import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { EZDB } from "./libraries/ezdb/index";

// start the content delivery server
function start_cdn(HOSTNAME : string, PORT : number)
{
    // const database : EZDB = new EZDB("database.sqlite3");

	// declare the cdn server
	const cdn : Elysia = new Elysia();
	cdn.use(cors()); // use cors

	// return user profile picture
	cdn.get("/profile/:profile_id", ({ params: { profile_id }}) => {
		return [""];
	}, { params : t.Object({ profile_id : t.String({error() { return "profile_id must be a string" }}) })});

	// return an offer's thumbnail image
	cdn.get("/offer_thumbnail/:offer_id", async ({ params: { offer_id }}) => {
        if (offer_id) {
            const thumbnail : any = file(`private/cdn/thumbnails/${offer_id}.png`);
            if (await thumbnail.exists()) {
                return thumbnail;
            } else return [""];
        }
		return "";
	}, { params : t.Object({ offer_id : t.String({ error() { return "offer_id must be a string" } }) }) });

    cdn.get("/offer_images/:offer_id", ({ params: { offer_id }}) => {
		return [""];
	}, { params : t.Object({ offer_id : t.String({ error() { return "offer_id must be a string" } }) }) });

	// listen on the parsed port and hostname
	cdn.listen({ port: PORT, hostname: HOSTNAME });

	// print out the address if it started successfully
	if (cdn) console.log(`[!] started CDN on http://${HOSTNAME}:${PORT}/`);
}

// export the main function
export {
	start_cdn
}