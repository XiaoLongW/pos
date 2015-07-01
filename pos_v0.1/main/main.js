//TODO: Please write code in this file.
function printReceipt(inputs) {
  var tmp=[];
  for( var x=0;x<inputs.length;x++){
    var counts=1;
    var bo=true;
    for(var y=0;y<tmp.length;y++){
      if(inputs[x]['name']==tmp[y]['name']){
        tmp[y]['count']++;
        bo=false;
        break;
      }
    }
    if(bo){
      tmp.push({name:inputs[x]['name'],unit:inputs[x]['unit'],price:inputs[x]['price'],count:counts});
    }
  }

  var str='***<没钱赚商店>收据***\n';
  var c_al1=0;
  for(var z=0;z<tmp.length;z++){
    c_al1+=tmp[z].count*tmp[z].price;
    str+='名称：'+tmp[z].name+'，数量：'+tmp[z].count+tmp[z].unit+'，单价：'+tmp[z].price.toFixed(2)+'(元)，小计：'+(tmp[z].count*tmp[z].price).toFixed(2)+'(元)\n';
  }
  str+='----------------------\n';
  str+='总计：'+c_al1.toFixed(2)+'(元)\n';
  str+='**********************';
  console.log(str);
}
