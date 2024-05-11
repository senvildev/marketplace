// import required frameworks etc
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

// create a websocket server
function start_socket(HOSTNAME, PORT)
{
	// declare it
	const websockets = new Elysia();
	websockets.use(cors()); // use cors
}