function Pos(cartItems) {
  this.cartItems = cartItems;
}

Pos.prototype.makePromotion = function () {
  this.cartItems.forEach(function (cartItem) {
    if (isPromotion(cartItem.item.barcode)) {
      cartItem.payCount -= Math.floor(cartItem.payCount / 3);
    }
  });

  function isPromotion(itemBarcode) {
    var isIn = false;
    var allPromotionBarcodes = getPromotionBarcodes();
    allPromotionBarcodes.forEach(function (onePromotionBarcode) {
      if (itemBarcode === onePromotionBarcode) {
        isIn = true;
      }
    });
    return isIn;
  }

  function getPromotionBarcodes() {
    var allPromotions = loadPromotions();
    var allPromotionBarcodes;
    allPromotions.forEach(function (onePromotion) {
      if (onePromotion.type === 'BUY_TWO_GET_ONE_FREE') {
        allPromotionBarcodes = onePromotion.barcodes;
      }
    });
    return allPromotionBarcodes;
  }
};

Pos.prototype.printReceipt = function () {
  var receipt =
    '***<没钱赚商店>收据***\n' +
    '打印时间：' + getTime() + '\n' +
    '----------------------\n' +
    getItemsString(this.cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getPromotionString(this.cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(this.cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getSave(this.cartItems)) + '(元)\n' +
    '**********************';
  console.log(receipt);

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

  function getPromotionString(cartItems) {
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

  function getTime() {
    var date = new Date();
    return (date.getFullYear() + '年' + toDouble(date.getMonth() + 1) + '月' + toDouble(date.getDate()) + '日 ' + toDouble(date.getHours()) + ':' + toDouble(date.getMinutes()) + ':' + toDouble(date.getSeconds()))
  }

  function toDouble(num) {
    return num < 10 ? ('0' + num) : ('' + num);
  }
};



