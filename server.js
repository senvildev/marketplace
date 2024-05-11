import { start_webserver } from "./private/webserver";
import { start_backend } from "./private/backend";
import { start_cdn } from "./private/cdn";

import {
	HOSTNAME,
	BACKEND_PORT, WEBSERVER_PORT, WEBSOCKET_PORT, CDN_PORT
} from "./config.json";

start_backend(HOSTNAME, BACKEND_PORT);
start_cdn(HOSTNAME, CDN_PORT);
start_webserver(HOSTNAME, WEBSERVER_PORT);