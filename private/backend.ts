import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

// create a backend server
function start_backend(HOSTNAME : string, PORT : number)
{
	// declare the backend
	const backend : Elysia = new Elysia();
	backend.use(cors()); // use cors

	// listen on the parsed port and hostname
	backend.listen({ port: PORT, hostname: HOSTNAME });

	backend.post("/register", ({ body }) => {
		console.log(body);
		return "balls";
	})

	// print out the address if the backend initialized successfully
	if (backend) console.log(`[!] started backend on http://${HOSTNAME}:${PORT}/`);
}

// export the function
export { start_backend }