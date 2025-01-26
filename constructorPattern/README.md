## 생성자 패턴

### 설명

- constructor 는 객체가 새로 만들어진 뒤 초기화하는데 사용되는 메소드
- ES6 버전이후로 생성자를 가진 class 를 만들 수 있음

### 객체 생성의 방법

```js
// 방법 1 : 리터럴 표기법을 사용하여 빈 객체를 생성
const newObject = {};

// 방법 2 : Object.create() 메소드를 사용하여 빈 객체를 생성
const newObject = Object.create(Object.prototype);

// 방법 3 : new 키워드를 사용하여 빈 객체를 생성
const newObject = new Object();
```

### 객체의 속성을 할당하는 방법

```js
// ES3 호환 방식
// 1. 도트를 통한 할당
newObject.someKey = "a";
var key = newObject.someKey;

// 2. 대괄호를 통한 할당
newObject["someKey"] = "a";
var key = newObject["someKey"];

// ES5 만 호환 되는 방식
// 3. Object.defineProperty 를 사용
// writable -> 해당 속성이 write 가능한지 아닌지 설정

// enumerable -> 해당 속성이 열거 가능한지 설정, for...in 루프나
// Object.keys(), JSON.stringify() 등에서 해당 속성이 나타날지를 제어

// configurable -> 해당 속성의 삭제 여부와 속성 설명자의 수정 가능 여부를
// 제어
Object.defineProperty(newObject, "a", {
  value: "someValue",
  writable: true,
  enumerable: true,
  configurable: true,
});

// 4. Object.defineProperty 방식이 복잡한 경우에는 아래와 같이
// 속성 정의가 가능
var defineProp = function (obj, key, value, configOptions) {
  const config = {
    value,
    ...configOptions,
  };

  Object.defineProperty(obj, key, config);
};

// defineProp 함수 사용법
// 빈 객체 "Person" 생성
var person = Object.create(null);

defineProp(person, "name", "김민수");
defineProp(person, "car", "테슬라");
defineProp(person, "dateOfBirth", "19900501");
defineProp(person, "hasChild", false);

// 5. 여러 속성을 한 번에 정의하고 싶으면 Object.defineProperties 를
// 사용가능
Object.defineProperties(newOBject, {
  "name": {
    value: "김민수",
    writable: true,
  },

  "car": {
    value: "테슬라",
    writable: true,
  }

  "dateOfBirth": {
    value: "19900501",
  }

  "hasChild": {
    value: false,
    writable: true,
  }
})

// defineProp 을 통한 객체 상속도 가능
const driver = Object.create(person);

// 속성 정의
defineProp(driver, "topSpeed", "100km/h");

console.log(driver.dateOfBirth); // "19900501"
console.log(driver.topSpeed); // "100km/h"

// 실행 결과는 constructorPatternInheritance.js 파일을 참고
```
