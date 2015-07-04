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
    str += '名称：' + tmp[z].name + '，数量：' + tmp[z].count + tmp[z].unit + '，单价：' + tmp[z].price + '(元)，小计：' + (tmp[z].count * tmp[z].price).toFixed(2) + '(元)\n';
  }
  str += '----------------------\n';
  str += '总计：' + c_al1.toFixed(2) + '(元)\n';
  str += '**********************';
  console.log(str);
}
function inT(iMember, tmp) {
  var idToGoods = {
    ITEM000000: {name: '可口可乐', unit: '瓶', price: '3.00'},
    ITEM000001: {name: '雪碧', unit: '瓶', price: '3.00'},
    ITEM000004: {name: '电池', unit: '个', price: '2.00'}
  };
  for (var y = 0; y < tmp.length; y++) {
    if (idToGoods[iMember].name == tmp[y].name) {
      tmp[y].count++;
      return;
    }
  }
  tmp.push({name: (idToGoods[iMember]).name, unit: idToGoods[iMember].unit, price: idToGoods[iMember].price, count: 1});
}
