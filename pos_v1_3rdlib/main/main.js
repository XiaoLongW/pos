function printReceipt(inputs) {
  var cart = [];
  var promotionsInCart = [];
  _.forEach(inputs, function (oneOfInputs) {
    var allItems = loadAllItems();
    var oneOfBuy = oneOfInputs.split('-');
    if (_.findIndex(cart, function (chr) {return chr.barcode == oneOfBuy[0];}) != -1) {
      alreadyBy(oneOfBuy, cart);
    } else {
      firstBuy(oneOfBuy, cart, allItems);
    }
  });
  _.forEach(cart, function (oneOfCart) {
    sureToPro(oneOfCart, promotionsInCart);
  });
  makeStrPrint(cart, promotionsInCart);
}
function makeStrPrint(cart, promotionsCart) {
  var str = '***<没钱赚商店>收据***\n';
  var allPayMoney = 0;
  var saveMoney = 0;
  _.forEach(cart, function (oneOfCart) {
    allPayMoney += oneOfCart.payCount * oneOfCart.price;
    str += '名称：' + oneOfCart.name + '，数量：' + oneOfCart.relCount + oneOfCart.unit + '，单价：' + oneOfCart.price.toFixed(2) + '(元)，小计：' + (oneOfCart.payCount * oneOfCart.price).toFixed(2) + '(元)\n';
  });
  str += '----------------------\n挥泪赠送商品：\n';
  _.forEach(promotionsCart, function (oneOfPro) {
    saveMoney += oneOfPro.priceP * oneOfPro.countP;
    str += '名称：' + oneOfPro.nameP + '，数量：' + oneOfPro.countP + oneOfPro.unitP + '\n';
  });
  str += '----------------------\n';
  str += '总计：' + allPayMoney.toFixed(2) + '(元)\n';
  str += '节省：' + saveMoney.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
function alreadyBy(good, cart) {
  var index = _.findIndex(cart, function (chr) {return chr.barcode == good[0];});
  cart[index].payCount = cart[index].relCount += good.length == 1 ? 1 : parseInt(good[1]);
}
function firstBuy(good, cart, allItems) {
  var index = _.findIndex(allItems, function (chr) {return chr.barcode == good[0];});
  cart.push({
    barcode: good[0], name: allItems[index].name,
    unit: allItems[index].unit, price: allItems[index].price,
    relCount: good.length == 1 ? 1 : parseInt(good[1]),
    payCount: good.length == 1 ? 1 : parseInt(good[1])
  });
}
function sureToPro(cartGood, proGoodsCol) {
  var proBarcodes = _.pluck(_.takeWhile(loadPromotions(), 'type', 'BUY_TWO_GET_ONE_FREE'), 'barcodes');
  proBarcodes = proBarcodes[0];
  _.forEach(proBarcodes, function (oneOfPro) {
    if ((cartGood.barcode == oneOfPro) && (cartGood.payCount >= 3)) {
      proGoodsCol.push({
        nameP: cartGood.name, countP: Math.floor(cartGood.payCount / 3),
        unitP: cartGood.unit, priceP: cartGood.price
      });
      cartGood.payCount -= Math.floor(cartGood.payCount / 3);
    }
  });
}
