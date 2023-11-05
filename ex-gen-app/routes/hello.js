const express = require('express');
const router = express.Router();
const http = require('https'); 
const parseString = require('xml2js').parseString;

router.get('/', (req, res, next) => {
  var opt = {
    host: 'news.google.com',
    port: 443,
    path: '/rss?hl=ja&ie=UTF-8&oe=UTF-8&gl=JP&ceid=JP:ja'
  };
  http.get(opt, (res2) => {
    var body = '';
    res2.on('data', (data) => {
      body += data;
    });
    res2.on('end', () => {
      parseString(body.trim(), (err, result) => {
        console.log(result);
        var data = {
          title: 'Google News',
          content: result.rss.channel[0].item
        };
        res.render('hello', data);
      });
    })
  });
});

router.post('/post', (req, res, next) => {
  var msg = req.body['message'];
  req.session.message = msg;
  var data = {
    title: 'Hello',
    content: "Last Message: " + req.session.message
  };
  res.render('hello', data);
});

module.exports = router;