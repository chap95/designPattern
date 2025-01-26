## 클래스의 생성자

### 설명

- 클래스는 새 객체를 초기화하는 `constructor()` 라는 이름의 메소드를 가지고 있어야 함
- `new` 키워드로 `constructor` 를 호출할 수 있음
- `constructor` 내부에서 사용된 `this` 키워드는 새로 생성된 해당 객체를 가리키고 있음

```js
class Car {
  constructor(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }

  toString() {
    return `${this.model} has done ${this.miles} miles`;
  }
}

// Car 클래스의 사용방법

let sonata = new Car("쏘나타", 2010, 20000);

console.log(sonata.toString());
```

위 코드와 같이 생성자를 사용할 수 있음

### 위 코드의 문제점

- 상속이 어려운 구조
- `toString` 메소드가 `Car` 의 인스턴스마다 새롭게 정의됨

```js
class Car {
  constructor(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
  }

  // 프로토타입 객체의 재정의를 피하기 위해 Object.prototype 대신
  // Object.prototype.someMethod 형태를 사용하고 있음
  // 기존에 이미 정의된 프로토타입 객체를 유지하기 위함
  Car.prototype.toString = function() {
    return `${this.model} has done ${this.miles} miles`;
  }
}
```

위와 같이 `prototype` 을 사용하면 인스턴스마다 `toString` 이 정의되는 것이 아닌 `prototype` 을 통해서 `toString` 메소드를 공유하게 됨
