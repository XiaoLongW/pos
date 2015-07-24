function Scanner() {

}

Scanner.prototype.scan = function (tag) {
  var tagArray = tag.split('-');
  var itemBarcode = tagArray[0];

  var counts = tagArray.length == 1 ? 1 : tagArray[1];
  var item = Item.find(itemBarcode);

  var cartItem = new CartItem(item, counts);
  return cartItem;
};
