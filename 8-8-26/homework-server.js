const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to my Node.js homework");
    } else if (req.url === "/profile") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`Tên học viên: Phạm Thanh Loan <br>
            Lớp: C2411L <br>
            Mục tiêu học Nodejs: Qua môn để ra trường`);
    } else if (req.url === "/nodejs") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("Node.js là runtime environment bên ngoài trình duyệt, được xây dựng trên nền tảng V8 JavaScript Engine của Google Chrome");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server is running at <http://localhost:3000>");
});