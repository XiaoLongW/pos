function Cart(cartItems) {
  this.cartItems = cartItems;
}
Cart.prototype.getCartItems = function (tags) {
  var oThis = this;
  tags.forEach(function (tag) {
    var tagArray = tag.split('-');
    var itemBarcode = tagArray[0];
    var counts = tagArray.length == 1 ? 1 : tagArray[1];
    var cartItem = findInCart(oThis.cartItems, itemBarcode);
    if (cartItem) {
      cartItem.addCount(counts);
    } else {
      var newCartItem = new CartItem(getItem(itemBarcode), counts, counts);
      oThis.cartItems.push(newCartItem);
    }
  });
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
};
