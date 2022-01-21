const http = require('http');

// requestLister с помощью него мы будем обрабатывать входящие соединения
// и возвращать пользователю ответ
const server = http.createServer((req, res));
