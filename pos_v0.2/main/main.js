function printReceipt(inputs) {
  var cart = [];
  for (var x = 0; x < inputs.length; x++) {
    putInCart(inputs[x], cart);
  }
  makeStrPrint(cart);
}
function makeStrPrint(cart) {
  var str = '***<没钱赚商店>收据***\n';
  var payMoney = 0;
  for (var z = 0; z < cart.length; z++) {
    payMoney += cart[z].count * cart[z].price;
    str += '名称：' + cart[z].name + '，数量：' + cart[z].count + cart[z].unit + '，单价：' + (cart[z].price).toFixed(2) + '(元)，小计：' + (cart[z].count * cart[z].price).toFixed(2) + '(元)\n';
  }
  str += '----------------------\n';
  str += '总计：' + payMoney.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
function putInCart(oneBarcode, cart) {
  var allItems = loadAllItems();
  for (var y = 0; y < cart.length; y++) {
    if (oneBarcode == cart[y].barcode) {
      cart[y].count += 1;
      return;
    }
  }
  for (var e = 0; e < allItems.length; e++) {
    if (allItems[e].barcode == oneBarcode) {
      cart.push({
        barcode: oneBarcode, name: allItems[e].name,
        unit: allItems[e].unit, price: allItems[e].price, count: 1
      });
    }
  }

}
