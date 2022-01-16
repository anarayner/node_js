const path = require('path');
const fs = require('fs');

//creating a dir
fs.mkdirSync(path.resolve(__dirname, 'dir'));

// recurcion way
fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir1', 'dir2'), {
  recursive: true,
});

//asynchronous
console.log('start');

fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
  if (err) {
    console.log('Error');
    return;
  } else {
    console.log('Folder created');
  }
});
console.log('end');

//dir removing

fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
  if (err) {
    throw err;
  }
});

fs.writeFile(path.resolve(__dirname, 'text.txt'), 'some text', (err) => {
  if (err) {
    throw err;
  }
  console.log('file created');
});

// callback helk
fs.appendFile(
  path.resolve(__dirname, 'text.txt'),
  'text added to the end',
  (err) => {
    if (err) {
      throw err;
    }
    fs.appendFile(path.resolve(__dirname, 'text.txt'), 'text added', (err) => {
      if (err) {
        throw err;
      }
      console.log('file fixed');
    });
  }
);

const writeFileAsync = async () => {
  return new Promise((resolve, reject) =>
    fs.writeFile(path.resolve(__dirname, 'text.txt'), 'some text', (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    })
  );
};

const appendFileAsync = async () => {
  return new Promise((resolve, reject) =>
    fs.appendFile(path.resolve(__dirname, 'text.txt'), 'some text', (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    })
  );
};

// it is better to have path and data as a parameters
const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    });
  });
};

const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    });
  });
};

const readFileAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err.message);
      }
      resolve(data);
    });
  });
};

// then we can use async/await or then/catch
writeFileAsync(path.resolve(__dirname, 'text.txt'), 'data')
  .then(() => appendFileAsync(path.resolve(__dirname, 'text.txt'), ' 123'))
  .then(() => appendFileAsync(path.resolve(__dirname, 'text.txt'), ' 555'))
  .then(() => appendFileAsync(path.resolve(__dirname, 'text.txt'), ' 888'))
  .then(() => readFileAsync(path.resolve(__dirname, 'text.txt'), ' 888'))
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// romoving a file
const removeFileAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.rm(path, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    });
  });
};
removeFileAsync(path.resolve(__dirname, 'text.txt')).then(() =>
  console.log('File removed')
);
