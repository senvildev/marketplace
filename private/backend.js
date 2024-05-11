import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";


// create a backend server
function start_backend(HOSTNAME, PORT)
{
	// declare the backend
	const backend = new Elysia();
	backend.use(cors()); // use cors

	// listen on the parsed port and hostname
	backend.listen({ port: PORT, hostname: HOSTNAME });

	// print out the address if the backend initialized successfully
	if (backend) console.log(`[!] started backend on http://${HOSTNAME}:${PORT}/`);
}

// export the function
export {
	start_backend
}