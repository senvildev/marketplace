import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";



function start_backend(HOSTNAME, PORT)
{
	const backend = new Elysia();
	backend.use(cors()); // add cors

	backend.listen({ port: PORT, hostname: HOSTNAME });

	if(backend) console.log(`[!] started backend on http://${HOSTNAME}:${PORT}/`);
}

export {
	start_backend
}