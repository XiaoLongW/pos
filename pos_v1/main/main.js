function printReceipt(inputs) {
  var cart = [];
  var promotionsInCart = [];
  for (var x = 0; x < inputs.length; x++) {
    putInCart(inputs[x], cart);
  }
  for (var y = 0; y < cart.length; y++) {
    sureToPro(cart[y], promotionsInCart);
  }
  makeStrPrint(cart, promotionsInCart);
}

function makeStrPrint(cart, promotionsCart) {
  var str = '***<没钱赚商店>收据***\n';
  var allPayMoney = 0;
  var saveMoney = 0;
  for (var x = 0; x < cart.length; x++) {
    allPayMoney += cart[x].payCount * cart[x].price;
    str += '名称：' + cart[x].name + '，数量：' + cart[x].relCount + cart[x].unit + '，单价：' + cart[x].price.toFixed(2) + '(元)，小计：' + (cart[x].payCount * cart[x].price).toFixed(2) + '(元)\n';
  }
  str += '----------------------\n挥泪赠送商品：\n';
  for (var y = 0; y < promotionsCart.length; y++) {
    saveMoney += promotionsCart[y].priceP * promotionsCart[y].countP;
    str += '名称：' + promotionsCart[y].nameP + '，数量：' + promotionsCart[y].countP + promotionsCart[y].unitP + '\n';
  }
  str += '----------------------\n';
  str += '总计：' + allPayMoney.toFixed(2) + '(元)\n';
  str += '节省：' + saveMoney.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
function putInCart(beFound, searchIn) {
  var allItems = loadAllItems();
  var arrBeFound = beFound.split('-');
  for (var y = 0; y < searchIn.length; y++) {
    if (arrBeFound[0] == searchIn[y].barcode) {
      searchIn[y].relCount += arrBeFound.length == 1 ? 1 : parseInt(arrBeFound[1]);
      searchIn[y].payCount += arrBeFound.length == 1 ? 1 : parseInt(arrBeFound[1]);
      return;
    }
  }
  for (var e = 0; e < allItems.length; e++) {
    if (allItems[e].barcode == arrBeFound[0]) {
      searchIn.push({
        barcode: arrBeFound[0],
        name: allItems[e].name,
        unit: allItems[e].unit,
        price: allItems[e].price,
        relCount: arrBeFound.length == 1 ? 1 : parseInt(arrBeFound[1]),
        payCount: arrBeFound.length == 1 ? 1 : parseInt(arrBeFound[1])
      });
    }
  }
}

function sureToPro(cartGood, proGoodsCol) {
  var allPromotions = loadPromotions();
  var proBarcodes = [];
  for (var x = 0; x < allPromotions.length; x++) {
    if (allPromotions[x].type == 'BUY_TWO_GET_ONE_FREE') {
      proBarcodes = allPromotions[x].barcodes;
    }
  }
  for (var y = 0; y < proBarcodes.length; y++) {
    if (cartGood.barcode == proBarcodes[y]) {
      if (cartGood.payCount >= 3) {
        proGoodsCol.push({
          nameP: cartGood.name,
          countP: Math.floor(cartGood.payCount / 3),
          unitP: cartGood.unit,
          priceP: cartGood.price
        });
        cartGood.payCount -= Math.floor(cartGood.payCount / 3);
      }
    }
  }
}
