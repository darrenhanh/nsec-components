import moment from 'moment'

export function getElementText(type) {
  switch (type) {
    case 'o3':
      type = 'O₃';
      break;
    case 'co':
      type = 'CO';
      break;
    case 'aqi':
      type = 'AQI';
      break;
    case 'pm25':
      type = 'PM₂.₅';
      break;
    case 'pm2.5':
      type = 'PM₂.₅';
      break;
    case 'pm10':
      type = 'PM₁₀';
      break;
    case 'no2':
      type = 'NO₂';
      break;
    case 'so2':
      type = 'SO₂';
      break;


    case 'AQI':
      type = 'AQI';
      break;
    case 'PM25':
      type = 'PM₂.₅';
      break;
    case 'PM2.5':
      type = 'PM₂.₅';
      break;
    case 'PM10':
      type = 'PM₁₀';
      break;
    case 'NO2':
      type = 'NO₂';
      break;
    case 'SO2':
      type = 'SO₂';
      break;
    case 'O3':
      type = 'O₃';
      break;
    case 'CO':
      type = 'CO';
      break;
  }
  return type;
}

/**
 * 将null置为--
 * @param list
 */
export function setNullValue(list) {
  list.map((ii) => {
    for (let field in ii) {
      if (!ii[field]) {
        ii[field] = '--'
      } else if (field === 'priPol') {
        ii['priPol'] = getElementText(ii['priPol']);

      }
    }
  })
}

export function getNameByKey(key, list) {
  let name = '';
  if (list && list.length > 0) {
    let selected = list.find((item) => item.key === key);
    if (selected) {
      name = selected['name']
    }
  }
  return name;
}


export function getUserDivId() {
  let userInfo = sessionStorage.userInfo;
  let user;
  if (sessionStorage.userInfo && typeof (sessionStorage.userInfo) === 'string') {
    try {
      user = JSON.parse(userInfo);
      return user.area;
    } catch (e) {
      return '';
    }
  }
}

export function getTimeList(selectedDay) {
  let timeList = [];
  if (selectedDay && typeof selectedDay === 'string') {

    timeList.push(moment(selectedDay).add('day', -2).format('MM月DD日'));
    timeList.push(moment(selectedDay).add('day', -1).format('MM月DD日'));
    timeList.push(moment(selectedDay).add('day', 0).format('MM月DD日'));
  }
  return timeList
}

export function getForecastTimeList(selectedDay) {
  let timeList = ['', '', ''];
  if (selectedDay) {
    let month = selectedDay.substring(4, 6);
    let day = selectedDay.substring(6, 8);
    timeList.pop();
    timeList.pop();
    timeList.pop();
    timeList.push(month + '月' + (parseInt(day) + 1) + '日');
    timeList.push(month + '月' + (parseInt(day) + 2) + '日');
    timeList.push(month + '月' + (parseInt(day) + 3) + '日');
  }
  return timeList;
}


export function getDivListByLevel(divList, levelList) {
  let optionList = [];
  if (levelList && levelList.length > 0) {
    levelList.map((level) => {
      if (divList && divList.length > 0) {
        let list = divList.filter((item) => item.divLevel === level);
        if (list && list.length > 0) {
          list.map((ii) => {
            optionList.push({key: ii.divId, name: ii.divName})
          })
        }
      }
    })
  }
  return optionList;
}

export function getDivListByParentId(divList, parentId) {

  let optionList = [];
  if (divList && divList.length > 0) {
    let find = divList.find(ii => ii.divId === parentId);
    if (find) {
      optionList.push({key: find.divId, name: find.divName});
    }
    let list = divList.filter((item) => item.parentId === parentId);
    if (list && list.length > 0) {
      list.map((ii) => {
        optionList.push({key: ii.divId, name: ii.divName})
      })
    }
  }
  return optionList;
}

export function getDivListById(divList) {
  let optionList = [];
  if (divList && divList.length > 0) {
    divList.map((divList) => {
      optionList.push({key: divList.stationId, name: divList.stationName})
    })

  }
  return optionList;
}


export function getDefaultAirElement(element) {
  switch (element) {
    case 'AQI':
      return 'aqi';
    case 'PM₂.₅':
      return 'pm25';
    case 'PM₁₀':
      return 'pm10';
    case 'CO':
      return 'co';
    case 'O₃':
      return 'o3';
    case 'SO₂':
      return 'so2';
    case 'NO₂':
      return 'no2';
    default:
      return element;
  }
}

/**
 * 获取一个对象的所有属性，返回列表
 * @param obj
 * @returns {Array}
 */
export function getFieldList(obj) {
  let fieldList = [];
  if (obj) {
    for (let field in obj) {
      if (obj.hasOwnProperty(field)) {
        fieldList.push(field);
      }
    }
  }
  return fieldList;
}

/**
 * 保留几位小数
 * @param index
 * @param value
 * @returns {*}
 */
export function toFix(index, value) {
  if (value) {
    if (typeof value === 'string') {
      value = parseFloat(value).toFixed(index);
    } else if (typeof value === 'number') {
      value = value.toFixed(index);
    }
  }
  return value;
}

/**
 * 删除list中的空元素，返回数组
 * @param list
 * @returns {*}
 */
export function delEmptyElement(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === '' || list[i] == null || typeof(list[i]) === undefined) {
      list.splice(i, 1);
      i = i - 1;
    }
  }
  return list;
}


export function filterEqualField(list, field, value) {
  let newList = [];
  if (list && list.length > 0) {
    list.map((ii) => {
      if (ii.hasOwnProperty(field)) {
        console.log('ii[field]',ii[field])
      }
    })
  } else {
    return newList;
  }
}
