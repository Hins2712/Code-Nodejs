const http = require("http");

const server = http.createServer((req, res) => {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);

    const data = { message: "Chao xìn cáo chín đuôi nhé" };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
});

server.listen(1998);