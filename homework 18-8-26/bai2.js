const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    
    if (parsedUrl.pathname === '/search') {
        const queryParams = querystring.parse(parsedUrl.query);
        
        const keyword = queryParams.keyword || 'N/A';
        const page = queryParams.page || 1;

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`<h3>Kết quả tìm kiếm:</h3>`);
        res.write(`<p>Keyword: ${keyword}</p>`);
        res.write(`<p>Page: ${page}</p>`);
        return res.end();
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

const PORT = 2712;
server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log(`Test link: http://localhost:${PORT}/search?keyword=nodejs&page=1`);
});
