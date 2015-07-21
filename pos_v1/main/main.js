function printReceipt(barcodes) {
  var cartItems = [];
  barcodes.forEach(function (barcode) {
    var arrBarcode = barcode.split('-');
    var itemBarcode = arrBarcode[0];
    var counts = arrBarcode.length == 1 ? 1 : arrBarcode[1];
    var cartItem = findInCart(cartItems, itemBarcode);
    if (cartItem) {
      cartItem.relCount = cartItem.payCount += counts;
    } else {
      cartItems.push({item: getItem(itemBarcode), relCount: counts, payCount: counts});
    }
  });
  makePro(cartItems);
  makeStrPrint(cartItems);
}

function getItem(barcode) {
  var allItems = loadAllItems();
  var item;
  allItems.forEach(function (oneItem) {
    if (oneItem.barcode == barcode) {
      item = oneItem;
    }
  });
  return item;
}

function findInCart(cartItems, barcode) {
  var cartItem = undefined;
  cartItems.forEach(function (oneCartItem) {
    if (oneCartItem.item.barcode == barcode) {
      cartItem = oneCartItem;
    }
  });
  return cartItem;
}

function makePro(cartItems) {
  cartItems.forEach(function (cartitem) {
    if (findInPros(cartitem.item.barcode) && (cartitem.payCount >= 3)) {
      cartitem.payCount -= Math.floor(cartitem.payCount / 3);
    }
  });
}
function findInPros(barcode) {
  var bool = false;
  var proBarcodes = (loadPromotions())[0].barcodes;
  proBarcodes.forEach(function (proBarcode) {
    if (barcode == proBarcode) {
      bool = true;
    }
  });
  return bool;
}
function makeStrPrint(cartItems) {
  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getProString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getSave(cartItems)) + '(元)\n' +
    '**********************';
  console.log(receipt);
}

function getSubTotal(count, price) {
  return count * price;
}

function getAmount(cartItems) {
  var amount = 0;
  cartItems.forEach(function (cartItem) {
    amount += getSubTotal(cartItem.payCount, cartItem.item.price);
  });
  return amount;
}

function getItemsString(cartItems) {
  var itemsString = '';
  cartItems.forEach(function (cartItem) {
    itemsString +=
      '名称：' + cartItem.item.name +
      '，数量：' + cartItem.relCount + cartItem.item.unit +
      '，单价：' + formatPrice(cartItem.item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.payCount, cartItem.item.price)) + '(元)\n';
  });
  return itemsString;
}
function getProString(cartItems) {
  var proString = '';
  cartItems.forEach(function (cartItem) {
    if (cartItem.relCount != cartItem.payCount) {
      proString += '名称：' + cartItem.item.name + '，数量：' + (cartItem.relCount - cartItem.payCount) + cartItem.item.unit + '\n';
    }
  });
  return proString;
}
function getSave(cartItems) {
  var saveMoney = 0;
  cartItems.forEach(function (cartItem) {
    if (cartItem.relCount != cartItem.payCount) {
      saveMoney += (cartItem.relCount - cartItem.payCount) * cartItem.item.price;
    }
  });
  return saveMoney;
}
function formatPrice(price) {
  return price.toFixed(2);
}

