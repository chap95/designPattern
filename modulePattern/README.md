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

위와 같이 `WeakMap` 을 활용하게 되면 여러개의 객체를 class 의 인스턴스로 생성하여 각 인스턴스마다 상태를 개별적으로 관리가 가능하며 `WeakMap` 의 특성을 활용하여 참조되지 않는 속성들은 메모리에서 해제가 가능하다.

> ##### 클로저 패턴을 사용하면은 인스턴스화 시킬 수 있는데 굳이 `WeakMap` 을 사용한 패턴이 좋은 이유가 무엇일까?

물론 아래와 같은 형태로도 `WeakMap` 을 어느 정도는 대체할 수 있음, 하지만 가비지 컬렉션이나 상속이 `WeakMap` 을 사용할 때 보다는 불편하다는 단점이 존재

```js
const createPerson = (initialName, initialAge) => {
  let name = initialName;
  let age = initialAge;

  return {
    getName: () => name,
    getAge: () => age,
    setName: (newName) => {
      name = newName;
    },
  };
};
```

- 클로저 패턴 코드의 GC

```js
let person = createPerson("John", 30);
person = null;
// 클로저로 인해서 name, age 가 즉시 GC 되지 않을 수 있음
// 따라서 reset 과 같은 추가적인 메소드가 필요함

const createPerson = (initialName, initialAge) => {
  let name = initialName;
  let age = initialAge;

  return {
    getName: () => name,
    getAge: () => age,
    setName: (newName) => {
      name = newName;
    },
    reset: () => {
      name = null;
      age = null;
    },
  };
};
```

- `WeakMap` 패턴의 GC

```js
const _privateData = new WeakMap();

class Person {
  constructor(name, age) {
    _privateData.set(this, {
      name: name,
      age: age,
    });
  }

  getName() {
    return _privateData.get(this).name;
  }
}

let person = new Person("John", 30);
// person 객체에 대한 참조가 없어지면
person = null;
// WeakMap의 특성으로 인해 관련된 비공개 데이터도
// 자동으로 가비지 컬렉션의 대상이 됩니다
```

- 클로저 패턴 코드의 상속

```js
// 부모 "클래스" 생성 함수
const createAnimal = (name) => {
  // 비공개 변수
  let energy = 100;

  return {
    getName: () => name,
    getEnergy: () => energy,
    eat: (amount) => {
      energy += amount;
    },
  };
};

// 자식 "클래스" 생성 함수
const createDog = (name, breed) => {
  // 부모의 기능을 가져옴
  const animal = createAnimal(name);

  // 새로운 비공개 변수
  let dogEnergy = animal.getEnergy(); // 부모의 비공개 변수에 직접 접근 불가

  return {
    ...animal, // 부모의 메서드들을 복사
    getBreed: () => breed,
    bark: () => {
      dogEnergy -= 10; // 부모의 energy 변수가 아닌 새로운 변수 사용
    },
  };
};

// 사용 예시
const myDog = createDog("Rex", "Golden Retriever");
console.log(myDog.getName()); // "Rex"
myDog.bark(); // energy 가 createAnimal 에도 존재하 createDog 에도 존재하는 상황, 각각 독립적으로 존재함
```

- `WeakMap` 패턴에서의 상속

```js
// 부모 클래스의 비공개 데이터를 위한 WeakMap
const _animalData = new WeakMap();

class Animal {
  constructor(name) {
    // WeakMap에 인스턴스별 비공개 데이터 저장
    _animalData.set(this, {
      name: name,
      energy: 100,
    });
  }

  getName() {
    return _animalData.get(this).name;
  }

  getEnergy() {
    return _animalData.get(this).energy;
  }

  eat(amount) {
    const data = _animalData.get(this);
    data.energy += amount;
    _animalData.set(this, data);
  }
}

// 자식 클래스의 비공개 데이터를 위한 WeakMap
const _dogData = new WeakMap();

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 부모 클래스의 constructor 호출

    // 자식 클래스만의 비공개 데이터 저장
    _dogData.set(this, {
      breed: breed,
    });
  }

  getBreed() {
    return _dogData.get(this).breed;
  }

  bark() {
    const animalData = _animalData.get(this);
    animalData.energy -= 10;
    _animalData.set(this, animalData);
  }
}

// 사용 예시
const myDog = new Dog("Rex", "Golden Retriever");
console.log(myDog.getName()); // "Rex"
myDog.bark();
console.log(myDog.getEnergy()); // 90
```

| 구분          | 클로저 패턴                                                           | `WeakMap` 패턴                                                                                                                        |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 상태관리      | 각 인스턴스가 자신만의 새로운 상태 복사본을 보유                      | 상태가 `WeakMap` 에 중앙 집중식으로 저장이 되며, 실제 상속 관계가 유지됨                                                              |
| 메모리 효율성 | 클로저 때문에 GC 가 안 될 가능성이 존재                               | `WeakMap` 의 특성으로 참조가 사라지게 되면 즉시 GC                                                                                    |
| 상속구조      | 진정한 상속이 아닌 객체들의 조합 방식                                 | JS의 클래스 상속 메커니즘을 온전히 사용 가능                                                                                          |
| 확장성        | 부모의 비공개 상태에 접근하기 힘들기 때문에 새로운 기능 추가에 제한적 | 클래스 상속 메커니즘을 활용하고 있기 때문에 `WeakMap` 을 통해서 부모의 비공개 상태에도 접근이 가능하기 때문에 새로운 기능 추가에 용이 |

### 노출 모듈 패턴

공개 변수나 메서드에 접근하기 위해서는 비공개 속성들과 공개 속성들을 서로 다른 스코프에 정의하여 사용하여 코드의 가독성이 좋지 않은 문제점이 존재했다.

```js
const Calculator = (function () {
  // 비공개
  let result = 0;

  // 외부로 공개할 메소드
  return {
    add: function (num) {
      result += num;
    },
    subtract: function (num) {
      result -= num;
    },
    getResult: function () {
      return result;
    },
  };
})();
```

위와 같이 해도 문제가 없지만 `return` 되는 부분에 내부 로직이 섞여있어 속성들이 많아지는 경우에는 가독성이 떨어질 수 있다.

```js
const Calculator = (function () {
  // 비공개 공개 모두 해당 영역에다가 정의
  let result = 0;

  function add(num) {
    result += num;
  }

  function subtract(num) {
    result -= num;
  }

  function getResult() {
    return result;
  }

  // 마지막에 공개할 메서드들을 명시적으로 노출
  return {
    add: add,
    subtract: subtract,
    getResult: getResult,
  };
})();
```
