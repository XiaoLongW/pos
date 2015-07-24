function CartItem(item, count) {
  this.item = item;
  this.count = count;
}
CartItem.prototype.find = function (cartItems) {
  var o_this = this;
  var cartItem = undefined;

  cartItems.forEach(function (oneCartItem) {
    if (oneCartItem.item.barcode == o_this.item.barcode) {
      cartItem = oneCartItem;
    }
  });
  return cartItem;
};

CartItem.prototype.isPromotion = function (allPromotionBarcodes) {
  var isIn = false;
  var o_this = this;

  allPromotionBarcodes.forEach(function (onePromotionBarcode) {
    if (o_this.item.barcode === onePromotionBarcode) {
      isIn = true;
    }
  });
  return isIn;
};

CartItem.prototype.addCount = function (addNumber) {
  this.count += addNumber;
};


