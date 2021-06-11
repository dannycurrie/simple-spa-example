const http = require("http");
const path = require("path");
const fs = require("fs");

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".wav": "audio/wav",
};

const getErrStatus = (err) => (err == "ENOENT" ? 404 : 500);

const app = http.createServer((req, res) => {
  let filePath = "." + req.url;
  const extName = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extName] || "";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      const status = getErrStatus(err);
      res.writeHead(status);
      res.end(content, "utf-8");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

app.listen(3000);
console.log("Server running on port 3000");
