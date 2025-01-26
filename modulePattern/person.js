const person = {
  name: "김민수",
  config: {
    useCaching: true,
    language: "ko",
  },
  introduce() {
    console.log(`제 이름은 ${this.name} 입니다.`);
  },
  getConfig() {
    console.log(
      `캐싱 사용여부 : ${this.config.useCaching ? "사용" : "미사용"}\n언어 : ${
        this.config.language
      }`
    );
  },
  updateConfig(newConfig) {
    if (typeof newConfig === "object") {
      this.config = {
        ...this.config,
        ...newConfig,
      };
    }
  },
};

person.introduce(); // 제 이름은 김민수 입니다.
person.getConfig(); // 캐싱 사용여부 : 사용
person.updateConfig({
  useCaching: false,
});
person.getConfig(); // 캐싱 사용여부 : 미사용
