// import { serveDir } from "@std/http";

// const userPagePattern = new URLPattern({ pathname: "/users/:id" });
// const staticPathPattern = new URLPattern({ pathname: "/static/*" });

// export default {
//   fetch(req) {
//     const url = new URL(req.url);

//     if (url.pathname === "/") {
//       return new Response("Home page");
//     }

//     const userPageMatch = userPagePattern.exec(url);
//     if (userPageMatch) {
//       return new Response(userPageMatch.pathname.groups.id);
//     }

//     if (staticPathPattern.test(url)) {
//       return serveDir(req);
//     }

//     return new Response("Not found", { status: 404 });
//   },
// } satisfies Deno.ServeDefaultExport;

import { generateShortCode, getShortLink, storeShortLink } from "./db.ts";
import { Router } from "./router.ts";
import { HomePage } from "./ui.tsx";
import { render } from "npm:preact-render-to-string";

const app = new Router();

app.get("/", () => {
  return new Response(render(HomePage({ user: null })), {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});

app.post("/links", async (req) => {
  const { longUrl } = await req.json();

  const shortCode = await generateShortCode(longUrl);
  await storeShortLink(longUrl, shortCode, "testUser");

  console.log(shortCode);
  return new Response("success!", {
    status: 201,
  });
});

app.get("/links/:id", async (_req, params) => {
  const shortCode = params?.pathname.groups.id;

  const data = await getShortLink(shortCode!);

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: {
      "content-type": "application/json",
    },
  });
});

export default {
  fetch(req) {
    return app.handler(req);
  },
} satisfies Deno.ServeDefaultExport;
