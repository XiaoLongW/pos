function printReceipt(tags) {
  var cartItems = [];

  var cart = new Cart(cartItems);
  cart.getCartItems(tags);

  var pos = new Pos(cart);
  pos.makePromotion();
  pos.printReceipt();
}



