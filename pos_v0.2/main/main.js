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
    str += '名称：' + cart[z].name + '，数量：' + cart[z].count + cart[z].unit + '，单价：' + cart[z].price + '(元)，小计：' + (cart[z].count * cart[z].price).toFixed(2) + '(元)\n';
  }
  str += '----------------------\n';
  str += '总计：' + payMoney.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
function putInCart(oneBarcode, cart) {
  var idToGoods = {
    ITEM000000: {name: '可口可乐', unit: '瓶', price: '3.00'},
    ITEM000001: {name: '雪碧', unit: '瓶', price: '3.00'},
    ITEM000004: {name: '电池', unit: '个', price: '2.00'}
  };
  for (var y = 0; y < cart.length; y++) {
    if (idToGoods[oneBarcode].name == cart[y].name) {
      cart[y].count++;
      return;
    }
  }
  cart.push({
    name: idToGoods[oneBarcode].name,
    unit: idToGoods[oneBarcode].unit,
    price: idToGoods[oneBarcode].price,
    count: 1
  });
}
