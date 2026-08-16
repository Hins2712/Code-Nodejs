const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("thah cong xam nhap");
});

server.listen(1106);