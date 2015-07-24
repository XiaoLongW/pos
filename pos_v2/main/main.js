function printReceipt(tags) {
  var promotionCalculator = new PromotionCalculator();
  var cart = new Cart(promotionCalculator);

  var scanner = new Scanner();

  var pos = new Pos(scanner, cart);
  pos.scan(tags);
  pos.printReceipt();
}



