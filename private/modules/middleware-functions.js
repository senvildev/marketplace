function no_caching(app) {
	return app.onRequest(({ set }) => {
		set.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
	});
}

export {
	no_caching
}