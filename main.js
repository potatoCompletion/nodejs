var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  const dataFolder = './data';

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir(dataFolder, function (error, fileList) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = '<ul>';
        for (var i = 0; i < fileList.length; i++) {
          list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        }
        list = list + '</ul>';
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      })
    } else {
      fs.readdir(dataFolder, function (error, fileList) {
        var list = '<ul>';
        for (var i = 0; i < fileList.length; i++) {
          list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        }
        list = list + '</ul>';
        fs.readFile(`./data/${queryData.id}`, 'utf8', function (error, description) {
          var title = queryData.id;
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        })
      })
    }
  }
});
app.listen(3000);
