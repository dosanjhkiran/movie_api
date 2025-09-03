const http = require('http');
const url = require('url');
const fs = require('fs');

// Create the server
http.createServer((request, response) => {
  // Parse the incoming URL
  let addr = request.url,
    q = new URL(addr, 'http://' + request.headers.host),
    filePath = '';

  // Log every request
  fs.appendFile('log.txt',
    'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Added to log.');
      }
    }
  );

  // Decide which file to send
  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = (__dirname + '/index.html');
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1>404 - Page Not Found</h1>');
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });

}).listen(8080);

console.log('My test server is running on Port 8080.');
