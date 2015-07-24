function Cart(promotionCalculator) {
  this.cartItems = [];
  this.promotionCalculator = promotionCalculator;
}
Cart.prototype.addCartItem = function (oneCartItem) {
  var cartItem = oneCartItem.find(this.cartItems);
  if (cartItem) {
    cartItem.addCount(oneCartItem.count);
  } else {
    this.cartItems.push(oneCartItem);
  }
};

Cart.prototype.makePromotion = function () {
  return this.promotionCalculator.buyTwoGetOneFree(this.cartItems)
};
