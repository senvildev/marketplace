import { start_webserver } from "./private/webserver";
import { start_backend } from "./private/backend";

import {
	HOSTNAME,
	BACKEND_PORT, WEBSERVER_PORT, WEBSOCKET_PORT
} from "./config.json";

start_backend(HOSTNAME, BACKEND_PORT);
start_webserver(HOSTNAME, WEBSERVER_PORT);