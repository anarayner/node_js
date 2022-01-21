const http = require('http');
const https = require('https');

const fetch = (url) =>
  new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        const { statusCode, statusMessage } = response;
        reject(new Error(`Error: ${(statusCode, statusMessage)}`));
      }
      response.setEncoding('utf8');
      let mydata = [];
      response.on('data', (chunk) => mydata.push(chunk));
      response.on('end', () => resolve(mydata));
    });
  });

//USAGE

fetch('https://jsonplaceholder.typicode.com')
  .then((body) => console.log(body))
  .catch((err) => console.log(`Error: ${err}`));
