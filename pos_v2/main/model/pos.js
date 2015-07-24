function Pos(scanner, cart) {
  this.cart = cart;
  this.scanner = scanner;
}

Pos.prototype.scan = function (tags) {
  var o_this = this;
  tags.forEach(function (tag) {
    var cartItem = o_this.scanner.scan(tag);
    o_this.cart.addCartItem(cartItem);
  });
};

Pos.prototype.printReceipt = function () {
  var afterPromotionItems = this.cart.makePromotion();
  var receipt =
    '***<没钱赚商店>收据***\n' +
    '打印时间：' + Utils.getTime() + '\n' +
    '----------------------\n' +
    Utils.getItemsString(afterPromotionItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    Utils.getPromotionString(afterPromotionItems) +
    '----------------------\n' +
    '总计：' + Utils.formatPrice(Utils.getAmount(afterPromotionItems)) + '(元)\n' +
    '节省：' + Utils.formatPrice(Utils.getSave(afterPromotionItems)) + '(元)\n' +
    '**********************';
  console.log(receipt);
};
