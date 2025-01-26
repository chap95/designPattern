import counterModule from "./counter.mjs";

counterModule.increment();
counterModule.reset();
// 위와 같이 선언해두면 counter.mjs 내부의 counter 변수에는 해당 피일에서 접근하지 못한다.
