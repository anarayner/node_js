const path = require('path');

// connecting parts of the path
console.log(path.join('first', 'second')); // return: first\second
console.log(path.join(__dirname, 'first', '..'));
console.log(path.resolve('first', 'second'));

const fullpath = path.resolve(__dirname, 'first', 'second.js');
console.log('Parsing', path.parse(fullpath));
/**
 * Parsing {
  root: 'C:\\',
  dir: 'C:\\Users\\17866\\Desktop\\node\\first',
  base: 'second.js',
  ext: '.js',
  name: 'second'
}
 */
console.log(path.isAbsolute(fullpath)); // true
console.log(path.basename(fullpath)); // second.js
console.log(path.extname(fullpath)); // .js

const siteURL = 'http://localhost:8080/users?id=5123';

// parsing
const url = new URL(siteURL);

console.log(url);
