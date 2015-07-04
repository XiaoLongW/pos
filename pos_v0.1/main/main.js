function printReceipt(inputs) {
  var tmp = [];
  for (var x = 0; x < inputs.length; x++) {
    inT(inputs[x], tmp);
  }
  makeStrAndPrint(tmp);
}
function makeStrAndPrint(tmp) {
  var str = '***<没钱赚商店>收据***\n';
  var c_al1 = 0;
  for (var z = 0; z < tmp.length; z++) {
    c_al1 += tmp[z].count * tmp[z].price;
    str += '名称：' + tmp[z].name + '，数量：' + tmp[z].count + tmp[z].unit + '，单价：' + tmp[z].price.toFixed(2) + '(元)，小计：' + (tmp[z].count * tmp[z].price).toFixed(2) + '(元)\n';
  }
  str += '----------------------\n';
  str += '总计：' + c_al1.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
function inT(iMember, tmp) {
  for (var y = 0; y < tmp.length; y++) {
    if (iMember.name == tmp[y].name) {
      tmp[y].count++;
      return;
    }
  }
  tmp.push({name: iMember.name, unit: iMember.unit, price: iMember.price, count: 1});
}
