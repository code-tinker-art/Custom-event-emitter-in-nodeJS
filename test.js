import { EventEmitter } from './main.js';

const emitter = new EventEmitter();

// TEST 1: Basic listen
console.log('TEST 1: Basic listen');
const test1 = [];
emitter.listen('msg', (data) => test1.push(data));
emitter.emit('msg', 'hello');
console.log(test1); // ['hello']

// TEST 2: Once fires only once
console.log('\nTEST 2: Once fires only once');
const test2 = [];
emitter.once('single', () => test2.push('fired'));
emitter.emit('single');
emitter.emit('single');
console.log(test2); // ['fired']

// TEST 3: Multiple listeners
console.log('\nTEST 3: Multiple listeners');
const test3 = [];
emitter.listen('multi', () => test3.push(1));
emitter.listen('multi', () => test3.push(2));
emitter.emit('multi');
console.log(test3); // [1, 2]

// TEST 4: Remove listener
console.log('\nTEST 4: Remove listener');
const test4 = [];
const fn = () => test4.push('removed');
emitter.listen('remove', fn);
emitter.listen('remove', () => test4.push('kept'));
emitter.removeListener('remove', fn);
emitter.emit('remove');
console.log(test4); // ['kept']

// TEST 5: Remove all
console.log('\nTEST 5: Remove all');
const test5 = [];
emitter.listen('all', () => test5.push(1));
emitter.listen('all', () => test5.push(2));
emitter.removeListener('all');
emitter.emit('all');
console.log(test5); // []

// TEST 6: Multiple args
console.log('\nTEST 6: Multiple args');
const test6 = [];
emitter.listen('args', (a, b, c) => test6.push(a + b + c));
emitter.emit('args', 1, 2, 3);
console.log(test6); // [6]

// TEST 7: Mixed listen + once
console.log('\nTEST 7: Mixed listen + once');
const test7 = [];
emitter.listen('mix', () => test7.push('persistent'));
emitter.once('mix', () => test7.push('once'));
emitter.emit('mix');
emitter.emit('mix');
console.log(test7); // ['persistent', 'once', 'persistent']

// TEST 8: Max listeners
console.log('\nTEST 8: Max listeners');
const emitter2 = new EventEmitter();
emitter2.maxListeners = 2;
emitter2.listen('max', () => { });
emitter2.listen('max', () => { });
emitter2.listen('max', () => { }); // Should fail
console.log('Added 3, should only have 2');

// TEST 9: Non-existent event
console.log('\nTEST 9: Non-existent event');
try {
    emitter.emit('doesnotexist');
    console.log('No crash');
} catch (e) {
    console.log('Error:', e.message);
}

// TEST 10: Invalid input
console.log('\nTEST 10: Invalid input');
const test10 = [];
emitter.listen('test10', 'not a function'); // Should error
emitter.emit('test10');
console.log(test10); // []