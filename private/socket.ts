// import required frameworks etc
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

// create a websocket server
function start_socket(HOSTNAME : string, PORT : number)
{
	// declare it
	const websockets : Elysia = new Elysia();
	websockets.use(cors()); // use cors
}

export { start_socket }