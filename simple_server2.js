const http = require('http');
const port = process.env.PORT || 5000;

 const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(`
    <html>
      <body>
        <h2>Hello there!</h2>
        <form method="post" action="/hello">
          <label for="name">What's your name?</label>
          <br />
          <input type="text" id="name" name="name" />
          <br />
          <button type="submit">Say Hello</button>
        </form>
      </body>
    </html>
  `);
  res.end();
  } else if (req.url === '/hello') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', function (chunk) {
        body += chunk.toString();
      });
      req.on('end', function () {
        const name = decodeURIComponent(body.split('=')[1]);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`<h1>Hello ${name}!</h1>`);
        res.end();
      });
    } else {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<h1>Bad Request</h1>');
      res.end();
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Not Found</h1>');
    res.end();
  }
});

server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
