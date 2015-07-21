function printReceipt(tags) {
  var cartItems = [];
  tags.forEach(function (tag) {
    var tagArray = tag.split('-');
    var itemBarcode = tagArray[0];
    var counts = tagArray.length == 1 ? 1 : tagArray[1];
    var cartItem = findInCart(cartItems, itemBarcode);
    if (cartItem) {
      cartItem.relCount = cartItem.payCount += counts;
    } else {
      cartItems.push({item: getItem(itemBarcode),
                      relCount: counts, payCount: counts});
    }
  });
  makePromotion(cartItems);
  makeReceiptPrint(cartItems);
}

function getItem(itemBarcode) {
  var allItems = loadAllItems();
  var item;
  allItems.forEach(function (oneItem) {
    if (oneItem.barcode == itemBarcode) {
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

function makePromotion(cartItems) {
  cartItems.forEach(function (cartItem) {
    if (isPromotion(cartItem.item.barcode)) {
      cartItem.payCount -= Math.floor(cartItem.payCount / 3);
    }
  });
}

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

function getPromotionBarcodes(){
  var allPromotions=loadPromotions();
  var allPromotionBarcodes;
  allPromotions.forEach(function(onePromotion){
    if(onePromotion.type === 'BUY_TWO_GET_ONE_FREE'){
      allPromotionBarcodes = onePromotion.barcodes;
    }
  })
  return allPromotionBarcodes;
}

function makeReceiptPrint(cartItems) {
  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getPromotionString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getSave(cartItems)) + '(元)\n' +
    '**********************';
  console.log(receipt);
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
