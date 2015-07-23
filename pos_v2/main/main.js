function printReceipt(tags) {
  var cart = new Cart();
  cart.getCartItems(tags);

  var pos = new Pos(cart);
  pos.makePromotion();
  pos.printReceipt();
}



