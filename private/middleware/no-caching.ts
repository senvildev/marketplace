import { Elysia, t } from "elysia";

function no_caching(app : Elysia) {
	return app.onRequest(({ set }) => {
		set.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
	});
}

export { no_caching }