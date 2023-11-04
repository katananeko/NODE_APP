const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// createServerの処理
function getFromClient(req, res) {

    var url_parts = url.parse(req.url, true);
    switch (url_parts.pathname){

        case '/':
            var content = "これはIndexページです。"
            var query = url_parts.query;
            if (query.msg != undefined){
                content += 'あなたは、「' + query.msg + '」と送りました。';
            }
            var content = ejs.render(index_page, {
                title: "Index",
                content: content,
            });
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(content);
            res.end();
            break;

        default:
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('no page...');
            break;
    }
}