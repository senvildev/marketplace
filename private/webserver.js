// import required frameworks etc
import { serve, file } from "bun";

const URL_DIRECTORIES = ['/', '/home'];

function start_webserver(HOSTNAME, PORT)
{
    const webserver = serve({
        host: HOSTNAME,
        port: PORT,

        fetch(request)
        {
            const url = new URL(request.url);
			if(URL_DIRECTORIES.includes(url.pathname)) {
				if(url.pathname == '/') return Response.redirect('/home', 301)
				url.pathname += '.html';
				return new Response(file(`public${url.pathname}`));
			}
			if(url.pathname.includes("js/") || url.pathname.includes("css/") || url.pathname.includes("src/"))
				return new Response(file(`public${url.pathname}`));
			return new Response("404");
        }
    })

    if(webserver) console.log(`[!] started webserver on http://${HOSTNAME}:${PORT}/`);
}

export {
    start_webserver
}