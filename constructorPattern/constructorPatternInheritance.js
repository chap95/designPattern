const defineProp = (obj, key, value, configOptions) => {
  const config = {
    value,
    ...configOptions,
  };

  Object.defineProperty(obj, key, config);
};

const person = Object.create(null);

defineProp(person, "name", "김민수");
defineProp(person, "car", "테슬라");
defineProp(person, "dateOfBirth", "19900501");
defineProp(person, "hasChild", false);

const driver = Object.create(person);

defineProp(driver, "topSpeed", "100km/h");

console.log(driver.name);
console.log(driver.topSpeed);
