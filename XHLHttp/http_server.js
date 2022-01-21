// browser requests
// contains client(index.html) and brower side

const http = require('http');
const fs = require('fs');
const path = require('path');

const index = fs.readFileSync('./http_index.html', {
  encoding: 'utf8',
  flag: 'r',
});

http
  .createServer((req, res) => {
    if (req.url === '/person') {
      res.end(JSON.stringify({ name: 'Victoria' }));
    } else {
      res.end(index);
    }
  })
  .listen(8000);
