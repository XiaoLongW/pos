function printReceipt(inputs) {
  var cart = [];
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
    oneOfCart.sureToPro();
  });
  var printMessage = new Printer(cart);
  printMessage.print();
}
function alreadyBy(item, cart) {
  var index = _.findIndex(cart, function (chr) {
    return chr.barcode == item[0];
  });
  cart[index].payCount = cart[index].relCount += item.length == 1 ? 1 : parseInt(item[1]);
}
function firstBuy(item, cart, allItems) {
  var index = _.findIndex(allItems, function (oneOfItems) {return oneOfItems.barcode == item[0];});
  var newItem = new CartItem(allItems[index].barcode, allItems[index].name, allItems[index].unit, allItems[index].price);
  newItem.payCount = newItem.relCount = item.length == 1 ? 1 : parseInt(item[1]);
  cart.push(newItem);
}
