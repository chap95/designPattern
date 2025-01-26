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
