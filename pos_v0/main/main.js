function printReceipt(inputs) {
  var str = '***<没钱赚商店>收据***\n';
  var c_al1 = 0;
  for (var i = 0; i < inputs.length; i++) {
    c_al1 += inputs[i].count * inputs[i].price;
    str += '名称：' + inputs[i].name + '，数量：' + inputs[i].count + inputs[i].unit + '，单价：' + inputs[i].price.toFixed(2) + '(元)，小计：' + (inputs[i].count * inputs[i].price).toFixed(2) + '(元)\n';
  }
  str += '----------------------\n';
  str += '总计：' + c_al1.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
