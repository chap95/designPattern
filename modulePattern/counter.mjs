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
