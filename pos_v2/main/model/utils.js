function Utils() {

}

Utils.getAmount = function (afterPromotionItems) {
  var amount = 0;
  afterPromotionItems.forEach(function (afterPromotionItem) {
    amount += afterPromotionItem.total;
  });
  return amount;
};

Utils.getSave = function (afterPromotionItems) {
  var saveMoney = 0;
  afterPromotionItems.forEach(function (afterPromotionItem) {
    if (afterPromotionItem.freeCount) {
      saveMoney += afterPromotionItem.freeCount * afterPromotionItem.cartItem.item.price;
    }
  });
  return saveMoney;
};

Utils.formatPrice = function (price) {
  return price.toFixed(2);
};

Utils.getTime = function () {
  var date = new Date();
  return (date.getFullYear() + '年' + toDouble(date.getMonth() + 1) + '月' + toDouble(date.getDate()) + '日 ' + toDouble(date.getHours()) + ':' + toDouble(date.getMinutes()) + ':' + toDouble(date.getSeconds()))

  function toDouble(num) {
    return num < 10 ? ('0' + num) : ('' + num);
  }
};

Utils.getItemsString = function (afterPromotionItems) {
  var itemsString = '';
  afterPromotionItems.forEach(function (afterPromotionItem) {
    itemsString +=
      '名称：' + afterPromotionItem.cartItem.item.name +
      '，数量：' + afterPromotionItem.cartItem.count + afterPromotionItem.cartItem.item.unit +
      '，单价：' + Utils.formatPrice(afterPromotionItem.cartItem.item.price) +
      '(元)，小计：' + Utils.formatPrice(afterPromotionItem.total) + '(元)\n';
  });
  return itemsString;
};

Utils.getPromotionString = function (afterPromotionItems) {
  var proString = '';
  afterPromotionItems.forEach(function (afterPromotionItem) {
    if (afterPromotionItem.freeCount) {
      proString += '名称：' + afterPromotionItem.cartItem.item.name + '，数量：' + afterPromotionItem.freeCount + afterPromotionItem.cartItem.item.unit + '\n';
    }
  });
  return proString;
};
