function Printer(carts) {
  this.carts = carts;
  this.allPayMoney = 0.00;
  this.saveMoney = 0.00;
  this.print = function () {
    var oThis = this;
    var str = '***<没钱赚商店>收据***\n';
    str += '打印时间：' + moment().format('YYYY年MM月DD日 HH:mm:ss') + '\n';
    str += '----------------------\n';
    _.forEach(this.carts, function (oneOfCarts) {
      oThis.allPayMoney += oneOfCarts.payCount * oneOfCarts.price;
      str += '名称：' + oneOfCarts.name + '，数量：' + oneOfCarts.relCount + oneOfCarts.unit + '，单价：' + (oneOfCarts.price).toFixed(2) + '(元)，小计：' + (oneOfCarts.payCount * oneOfCarts.price).toFixed(2) + '(元)\n';
    });
    str += '----------------------\n挥泪赠送商品：\n';
    _.forEach(this.carts, function (oneOfCarts) {
      if (oneOfCarts.payCount != oneOfCarts.relCount) {
        oThis.saveMoney += oneOfCarts.price * ( oneOfCarts.relCount - oneOfCarts.payCount);
        str += '名称：' + oneOfCarts.name + '，数量：' + ( oneOfCarts.relCount - oneOfCarts.payCount) + oneOfCarts.unit + '\n';
      }
    });
    str += '----------------------\n';
    str += '总计：' + this.allPayMoney.toFixed(2) + '(元)\n';
    str += '节省：' + this.saveMoney.toFixed(2) + '(元)\n';
    str += '**********************';
    console.log(str);
  };
}
