/**
 * 调用iframe方法
 * @param frame
 * @param action
 * @param param
 */
export function dispatchGisFunction(frame, action, param) {
  if (frame) {
    if (frame[action]) {
      frame[action](param);
    }
  }
}

/**
 * 深比较，判断两个对象是否相等，返回true\false
 * @param obj1
 * @param obj2
 * @returns {*}
 */
export function equal(obj1, obj2) {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  if (!o1 || !o2) {/*  判断不是对象  */
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }
  if (obj1 instanceof Array && obj2 instanceof Array && obj1.length === 0 && obj2.length === 0) {
    return true;
  }
  for (let attr in obj1) {
    if (obj1.hasOwnProperty(attr) && obj2.hasOwnProperty(attr)) {
      let t1 = obj1[attr] instanceof Object;
      let t2 = obj2[attr] instanceof Object;
      if (t1 && t2) {
        return equal(obj1[attr], obj2[attr]);
      } else if (obj1[attr] !== obj2[attr]) {
        return false;
      }
    } else if (attr !== 'distinct') {
      return false;
    }
  }
  return true;
}

/**
 * 获取参数code
 * @param type
 * @returns {number}
 */
export function getTypeCode(type) {
  let code = 0;
  // 1为AQI 2 CO 3 so2 4 o3 5 no2 6 pm25 7pm10
  //const sixEleOptions = ['AQI', 'PM₂.₅', 'PM₁₀', 'O₃', 'CO', 'SO₂', 'NO₂'];
  switch (type) {
    case 'AQI':
      code = 1;
      break;
    case 'CO':
      code = 2;
      break;
    case 'SO₂':
      code = 3;
      break;
    case 'O₃':
      code = 4;
      break;
    case 'NO₂':
      code = 5;
      break;
    case 'PM₂.₅':
      code = 6;
      break;
    case 'PM₁₀':
      code = 7;
      break;
  }
  return code;
}
