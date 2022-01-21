// Readable
// Writable
// Duplex - both
// Transform

// if we have a big file, insteat of read entire file and
// then send it to the user (becouse it is can take a lot of time)
// we can split it to the little pieces. read -> send -> read -> send

const fs = require('fs');
const path = require('path');
const http = require('http');
const res = require('express/lib/response');

fs.readFile(path.resolve(__dirname, 'text.txt'), (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'));

// we dont have a callbak here so we need an event
// the mosr important event data allow us to read the file

stream.on('data', (chunk) => {
  console.log(chunk);
});

stream.on('open', () => console.log('Started to read'));
stream.on('end', () => console.log('Finifed to read'));
// it is very important to check for the errors
stream.on('error', (e) => console.log(e));

const writableStream = fs.createWriteStream(
  path.resolve(__dirname, 'text2.txt')
);

for (let i = 0; i < 20; i++) {
  writableStream.write(i + '\n');
}

writableStream.end();
writableStream.close();
writableStream.destroy();

http.createServer((req, res) => {
  // req - is readable stream
  // res - is writable stream
  // for example we need to send a file to the user
  const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'));

  // стрим закончит читать раньше чем пользователь скачает
  // stream.on('data', chunk => res.write(chunk))
  // stream.on('end', chunk => res.end())
  stream.pipe(res); // sync between readale and writable
});
