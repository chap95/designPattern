## module 패턴

### 초기 JS의 모듈 구현 방법

- 객체 리터럴 표기법
- 모듈 패턴
- AMD 모듈
- CommonJS 모듈

### 객체 리터럴 표기법

```js
const myObjectLiteral = {
  variableKey: "someKey",
  functionKey: () {
    //...
  }
}

// 객체 리터럴은 new 연산자를 필요로 하지 않음
// 중괄호를 통해 객체 블록의 시작을 명시
```

### 예제

```js
const person = {
  name: "김민수",
  config: {
    useCaching: true,
    language: "ko",
  },
  introduce: () {
    console.log(`제 이름은 ${this.name} 입니다.`)
  },
  getConfig: () {
    console.log(`캐싱 사용여부 : ${this.useCaching ? "사용" : "미사용"}`)
  },
  updateConfig:(newConfig) {
    if(typeof newConfig === "object") {
      this.config = {
        ...this.config,
        ...newConfig
      }
    }
  }
};

// 위 코드 실행 결과를 알고 싶으녀 person.js 참고
```

### 비공개

- 모듈 패턴은 클로저를 활용하여 비공개 상태와 구성을 캡슐화
- 공개 및 비공개 메소드와 변수를 묶어 전역 스코프로의 유출을 방지하고 다른 개발자의 인터페이스 충돌을 예방
- 클로저를 사용하더라도 return 되는 객체에 포함된 변수와 메소드는 공개되어 다른 곳에서도 사용이 가능함, 이를 방지하려면 `WeakMap()` 을 사용하여함
- `WeakMap` 은 객체만 키로 설정할 수 있으며 iterate 가 불가을하므로 모듈 내부의 객체에 접근하는 유일한 방법은 해당 객체의 참조

```js
// counter.mjs
let counter = 0; // 외부에서 접근하지 못하므로 비공개 변수가 된다.

const counterModule = {
  increment() {
    return counter++;
  },
  reset() {
    console.log(`카운터를 리셋 합니다. 현재 counter : ${counter}`);
    counter = 0;
  },
};

export default counterModule;

// counterTest.mjs
import counterModule from "./counter.mjs";

counterModule.increment();
counterModule.reset();
// 위와 같이 선언해두면 counter.mjs 내부의 counter 변수에는 해당 피일에서 접근하지 못한다.
```

### WeakMap 을 활용한 모듈 패턴

- ES6 부터 도입된 `WeakMap` 은 value 에는 무엇이든 할당이 가능하지만 key 는 객체이어야 함
- `WeakMap` 은 이름에서도 알 수 있듯이 `느슨한` map 인데 느슨한 의미는 참조가 되지 얂으면 가비지 컬렉팅 된다는 의미

```js
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
// _counter 에 testCounter 와 testCounter2 객체에 관련된 상태들이 저장됨
testCounter.increment();
testCounter2.increment();
```
