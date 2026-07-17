export default {
  fetch(request) {
    const url = new URL(request.url);
    if (!url.hostname.startsWith("www.")) {
      return new Response("Not found", { status: 404 });
    }

    url.hostname = url.hostname.slice(4);
    return Response.redirect(url.toString(), 301);
  },
};
