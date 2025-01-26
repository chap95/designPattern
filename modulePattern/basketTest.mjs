import basketModule from "./basket.mjs";

basketModule.addItem({
  name: "샴푸",
  price: 2500,
});

basketModule.addItem({
  name: "바디워시",
  price: 3000,
});

console.log(basketModule.getItemCount()); // 2
console.log(basketModule.getTotalPrice()); // 5500

basketModule.resetBasketList();

console.log(basketModule.getItemCount()); // 0
console.log(basketModule.getTotalPrice()); // 0
