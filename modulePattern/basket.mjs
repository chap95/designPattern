const basketList = [];

const reset = () => {
  while (basketList.length > 0) {
    basketList.pop();
  }
};

const basketModule = {
  addItem(basket) {
    basketList.push(basket);
  },
  getItemCount() {
    return basketList.length;
  },
  getTotalPrice() {
    return basketList.reduce((sum, item) => {
      return item.price + sum;
    }, 0);
  },
  resetBasketList() {
    reset();
  },
};

export default basketModule;
