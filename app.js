const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// createServerの処理
function getFromClient(req, res) {

    var url_parts = url.parse(req.url, true);
    switch (url_parts.pathname){

        case '/':
            response_index(req, res);
            break;

        case '/other':
            response_other(req, res);
            break;

        case '/style.css':
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(style_css);
            res.end();
            break;

        default:
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('no page...');
            break;
    }
}

// indexのアクセス処理
function response_index(req, res) {
    if (req.method == 'POST') {
        var body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', () => {
            data = qs.parse(body);
            write_index(req, res);
        });
    } else {
        write_index(req, res);
    }
}

function write_index(req, res) {
    var msg = "※伝言を表示します。";
    var content = ejs.render(index_page, {
        title: "Indexページ",
        content: msg,
        data: data,
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(content);
    res.end();
}

// otherのアクセス処理
function response_other(req, res) {
    var msg = "これはOtherページです。";
    var content = ejs.render(other_page, {
        title: "Other",
        content: msg,
        data: data2,
        filename: 'data_item'
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(content);
    res.end();
}

var data = { msg: 'no message...'};

var data2 = {
    'Taro': ['taro@yamada', '09-999-999', 'Tokyo'],
    'Hanako': ['hanako@flower', '080-888-888', 'Yokohama'],
    'Sachiko': ['sachi@happy', '070-777-777', 'Nagoya'],
    'Ichiro': ['ichi@baseball', '060-666-666', 'USA'],
}