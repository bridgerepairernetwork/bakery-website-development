// Load environment variables from .env.production when running with `node server.js`
// (Next.js only auto-loads .env files during `next build`/`next start`, not raw node execution)
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
// Bind to 0.0.0.0 so the server is reachable on shared/VPS hosting
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      // Always return JSON so API clients can parse the error
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
