function CartItem(barcode, name, unit, price) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.relCount = 0.00;
  this.payCount = 0.00;
  this.sureToPro = function () {
    var oThis = this;
    var allPromotions = loadPromotions()[0].barcodes;
    _.forEach(allPromotions, function (oneOfPro) {
      if ((oneOfPro == oThis.barcode) && (oThis.payCount >= 3)) {
        oThis.payCount -= Math.floor(oThis.payCount / 3);
      }
    });
  }
}

