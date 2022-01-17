// позволяет создавать события и подписываться на них

// это класс
const Emmiter = require('events');
const { emit } = require('process');

// из этого класса создадим обьект
const emmiter = new Emmiter();

emmiter.on('message', (data, second, third) => {
  console.log('You sent message ' + data);
  console.log('Second parament ' + second);
});

const MESSAGE = process.env.message || '';

if (MESSAGE) {
  emmiter.emit('message', MESSAGE, 123);
} else {
  emmiter.emit('message', 'MESSAGE is empty');
}
/**  
node events.js
return:
You sent message MESSAGE is empty
Second parament undefined

cross-env MESSAGE="message 123" node events.js
return:
You sent message message 123
Second parament 123

Where can we use that?
- http
- websockets
- long pulling
- clusters
*/

// allows you to generate an event only once
emmiter.once('message');

// removes the specified listener from the listener array for the event
emmiter.removeListener();
// removes all listeners
emmiter.removeAllListeners();
