let _counter = new WeakMap();

class CounterModule {
  constructor() {
    _counter.set(this, 0);
  }
  increment() {
    let counter = _counter.get(this);
    _counter.set(this, ++counter);
  }
  reset() {
    _counter.set(this, 0);
  }
  getCounter() {
    return _counter.get(this);
  }
}

const testCounter = new CounterModule();
const testCounter2 = new CounterModule();

testCounter.increment();
testCounter2.increment();

console.log(testCounter.getCounter(), testCounter2.getCounter());

testCounter2.reset();

console.log(testCounter.getCounter(), testCounter2.getCounter());
