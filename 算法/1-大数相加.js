// function bigNumberSum(a, b) {
//     //这里发现一个奇怪现象，数字过大时转字符串会把后面几位置0,如(123123232131232131231).toString()
//     let aString = a.toString(), bString = b.toString();
//     let maxLength = Math.max(aString.length, bString.length);
//     if (bString.length < maxLength) {
//         bString = bString.padStart(maxLength, "0");
//     }
//     if (aString.length < maxLength) {
//         aString = aString.padStart(maxLength, "0");
//     }
//     let res = "", cur = 0;
//     for(let i = maxLength-1; i >= 0; i--) {
//         let sum = parseInt(aString[i]) + parseInt(bString[i]) + cur;
//         cur = 0;
//         if (sum >= 10) {
//             res = (sum%10) + res;
//             cur = 1;
//         } else {
//             res = sum + res;
//         }
//     }
//     if (cur) {
//         res = "1" + res;
//     }
//     return parseInt(res);
// }

function bigNumberSum(a, b) {
  a = a.toString(), b = b.toString();
  
    // padding
    let cur = 0;
    while (cur < a.length || cur < b.length) {
      if (!a[cur]) {
        a = "0" + a;
      } else if (!b[cur]) {
        b = "0" + b;
      }
      cur++;
    }
  
    let carried = 0;
    const res = [];
  
    for (let i = a.length - 1; i > -1; i--) {
      const sum = carried + +a[i] + +b[i];
      if (sum > 9) {
        carried = 1;
      } else {
        carried = 0;
      }
      res[i] = sum % 10;
    }
    if (carried === 1) {
      res.unshift(1);
    }
  
    return res.join("");
  }
  
console.log(bigNumberSum(10000000000000, 13123123123123));