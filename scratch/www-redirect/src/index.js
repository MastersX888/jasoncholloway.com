export default {
  fetch(request) {
    const url = new URL(request.url);
    if (!url.hostname.startsWith("www.")) {
      return new Response("Not found", { status: 404 });
    }

    const apexHost = url.hostname.slice(4);
    const path = url.pathname;

    // Imprint routes: one-hop redirect from www (avoids www → apex → SCP chain).
    if (apexHost === "jasoncholloway.com") {
      if (path === "/press" || path.startsWith("/press/")) {
        return Response.redirect("https://seventhcitypress.com/", 301);
      }
      if (path.startsWith("/press-kit/")) {
        const rest = path.slice("/press-kit".length);
        return Response.redirect(`https://seventhcitypress.com/press-kit${rest}`, 301);
      }
    }

    url.hostname = apexHost;
    return Response.redirect(url.toString(), 301);
  },
};
