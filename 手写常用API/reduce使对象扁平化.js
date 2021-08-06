/* test obj*/
const obj = {
    "a": {
      "b": {
        "c": {
          "d": 1
        }
      }
    },
    "aa": 2,
    "c": [
      1,
      2
    ]
  };
//   { 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }
function parse(obj) {
    const ObjArr = [...obj];
}