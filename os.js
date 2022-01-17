const os = require('os');
// позволяет однопоточному ноду использовать
//все возможности многоядерных систем
const cluster = require('cluster');

// console.log(os.platform());
// console.log(os.arch());
// console.log(os.cpus().length);

const cpus = os.cpus();

// for (let i = 0; i < cpus.length - 2; i++) {
//   const CPUcore = cpus[i];
//   console.log('another node js processor run');
// }

// checking if current process is main

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length - 2; i++) {
    cluster.fork();
  }
  // something can go wrong
  // эти ситуации нужно обратотать
  //(событийно ориантированная модель)
  // мы может подписываться на определенные события это делается с помощью EventEmmiter
  // подписываемся на событие exit точно также как мы подписываемся
  // на событие нажития кнопки и input
  cluster.on('exit', (worker, code, signal) => {
    console.log(` worker ${worker.process.pid} died..`);
    // и сразу запускаем новый процесс
    cluster.fork();
    // если нам нужно остановить процесс то мы можем передавать коды и сигналы
    // но для эгото существуют различные пакеты и библиотеки
    if(code===){
        cluster.fork()
    } else{
        console.log('worker dead');
    }
  });
} else {
  console.log(` worker ${process.pid} start running..`);
  setInterval(() => {
    console.log(` worker ${process.pid} still running..`);
  }, 5000);
}
