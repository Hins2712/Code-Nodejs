const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(300, { "Content-Type": "text/plain" });
    res.end("Gugu gaga");
});

server.listen(2712, () => {
    console.log("Server is running at http://localhost:2712");
});