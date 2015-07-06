function printReceipt(inputs) {
  var str = '***<没钱赚商店>收据***\n';
  var payMoney = 0;
  for (var i = 0; i < inputs.length; i++) {
    payMoney += inputs[i].count * inputs[i].price;
    str += '名称：' + inputs[i].name + '，数量：' + inputs[i].count + inputs[i].unit + '，单价：' + inputs[i].price.toFixed(2) + '(元)，小计：' + (inputs[i].count * inputs[i].price).toFixed(2) + '(元)\n';
  }
  str += '----------------------\n';
  str += '总计：' + payMoney.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
