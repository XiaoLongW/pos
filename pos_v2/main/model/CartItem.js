function CartItem(item, payCount, relCount) {
  this.item = item;
  this.payCount = payCount;
  this.relCount = relCount;
}
CartItem.prototype.addCount = function (addNumber) {
  this.payCount = this.relCount += addNumber;
};


