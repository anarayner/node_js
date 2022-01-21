const fs = require('fs');
const http = require('https');

url = 'https://jsonplaceholder.typicode.com';

http.get(url, (res) => {
  console.log(` 1: ${res.req._header}`);
  console.log(` 2: ${res.headers.join()}`);

  if (res.statusCode !== 200) {
    const { statusCode, statusMessage } = res;
    console.log(`Error: ${statusCode}, ${statusMessage} `);
  }
  res.setEncoding('utf8');
  const buffer = [];
  res.on('data', (chunk) => buffer.push(chunk));
  res.on('end', () => {
    const data = buffer.join();
    console.log(`Data: ${data.length} chunks: ${buffer.length}`);
    fs.writeFile('content.html', data, () => {
      console.log('Saved');
    });
  });
});
