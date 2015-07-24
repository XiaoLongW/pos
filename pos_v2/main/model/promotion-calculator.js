function PromotionCalculator() {

}
PromotionCalculator.prototype.buyTwoGetOneFree = function (cartItems) {
  var promotionItems = [];
  var promotionBarcodes = this.getPromotionBarcodes();

  cartItems.forEach(function (cartItem) {
    var freeCount = 0;
    var total = (cartItem.item.price) * (cartItem.count);

    if (cartItem.isPromotion(promotionBarcodes)) {
      freeCount = Math.floor(cartItem.count / 3);
      total = total - (cartItem.item.price) * freeCount;
    }

    var promotionItem = new AfterPromotionItem(cartItem, freeCount, total);
    promotionItems.push(promotionItem);
  });
  return promotionItems;
};

PromotionCalculator.prototype.getPromotionBarcodes = function () {
  var allPromotions = loadPromotions();
  var allPromotionBarcodes;

  allPromotions.forEach(function (onePromotion) {
    if (onePromotion.type === 'BUY_TWO_GET_ONE_FREE') {
      allPromotionBarcodes = onePromotion.barcodes;
    }
  });
  return allPromotionBarcodes;
};
