
/**
 * 判断aqi的污染等级，返回对应的颜色
 * @param aqi
 * @returns {string}
 */
export function getAqiColor(aqi) {//#daffdf    #fffeda    #fdedcb   #fedcd6    #ffd7eb    #fcc5d1
  //02e300   feff01   ff7f00   fe0002  98004b   7f031f
  var color = '';
  if (aqi >= 0 && aqi <= 50) {
    color = '#02e300';//'#02e300'
  } else if (aqi > 50 && aqi <= 100) {
    color ='#feff01'; //'#feff01'
  } else if (aqi > 100 && aqi <= 150) {
    color ='#ff7f00'; //'#ff7f00'
  } else if (aqi > 150 && aqi <= 200) {
    color = '#fe0002';//'#fe0002'
  } else if (aqi > 200 && aqi <= 300) {
    color = '#98004b';//'#98004b'
  } else if (aqi > 300) {
    color = '#7f031f';//'#7f031f'
  }
  return color
}

/**
 * 根据aqi获取对应文字的颜色
 * @param aqi
 * @returns {string}
 */
export function getTextColor(aqi) {
  var color = '';
  if (aqi > 50 && aqi <= 100) {
    color = 'black'
  } else {
    color = 'white'
  }
  return color
}

/**
 * 获取AQI等级
 * @param aqi
 * @returns {string}
 */
export function getAqiLevel(aqi) {
  var level = '';
  if (aqi >= 0 && aqi <= 50) {
    level = '优'
  } else if (aqi > 50 && aqi <= 100) {
    level = '良'
  } else if (aqi > 100 && aqi <= 150) {
    // level = '轻度污染'
    level = '轻'
  } else if (aqi > 150 && aqi <= 200) {
    // level = '中度污染'
    level = '中'
  } else if (aqi > 200 && aqi <= 300) {
    // level = '重度污染'
    level = '重'
  } else if (aqi > 300) {
    // level = '严重污染'
    level = '严重'
  }
  return level
}

/**
 * 获取AQI等级（返回完整文字）
 * @param aqi
 * @returns {string}
 */
export function getAllAqiLevel(aqi) {
  var level = '';
  if (aqi >= 0 && aqi <= 50) {
    level = '优'
  } else if (aqi > 50 && aqi <= 100) {
    level = '良'
  } else if (aqi > 100 && aqi <= 150) {
    level = '轻度污染'
    // level = '轻'
  } else if (aqi > 150 && aqi <= 200) {
    level = '中度污染'
    // level = '中'
  } else if (aqi > 200 && aqi <= 300) {
    level = '重度污染'
    // level = '重'
  } else if (aqi > 300) {
    level = '严重污染'
    // level = '严'
  }
  return level
}


/**
 * 获取风向
 * @param direction
 * @returns {string}
 */
export function getWindDirection(direction) {
  if (direction < 22.5) {
    return "北风";
  } else if (direction < 67.5) {
    return "东北风";
  } else if (direction < 112.5) {
    return "东风";
  } else if (direction < 157.5) {
    return "东南风";
  } else if (direction < 202.5) {
    return "南风";
  } else if (direction < 247.5) {
    return "西南风";
  } else if (direction < 292.5) {
    return "西风";
  } else if (direction < 337.5) {
    return "西北风";
  } else if (direction >= 337.5) {
    return "北风";
  } else {
    return direction;
  }
}

/**
 * 获取风速
 * @param speed
 * @returns {Array}
 */
export function getWindSpeed(speed) {
  var result = '';
  if (speed < 0.3) {
    result = ("静风");
  } else if (speed < 1.6) {
    result = ("1级");
  } else if (speed < 3.4) {
    result = ("2级");
  } else if (speed < 5.5) {
    result = ("3级");
  } else if (speed < 8.0) {
    result = ("4级");
  } else if (speed < 10.8) {
    result = ("5级");
  } else if (speed < 13.9) {
    result = ("6级");
  } else if (speed < 17.2) {
    result = ("7级");
  } else if (speed < 20.8) {
    result = ("8级");
  } else if (speed < 24.5) {
    result = ("9级");
  } else if (speed < 28.5) {
    result = ("10级");
  } else if (speed < 32.6) {
    result = ("11级");
  } else if (speed < 37.0) {
    result = ("12级");
  } else if (speed < 41.5) {
    result = ("13级");
  } else if (speed < 46.2) {
    result = ("14级");
  } else if (speed < 51) {
    result = ("15级");
  } else if (speed < 56.1) {
    result = ("16级");
  } else if (speed < 61.2) {
    result = ("17级");
  } else if (speed >= 61.2) {
    result = ("17级以上");
  }
  return result;
}

/**
 * 将阈值塞到list中返回
 * @param list
 * @param stationType
 * @returns {*[]}
 */
export function getSetValueList(list, stationType) {
  let elementList = [
    {type: 'aqi', value: 150},
    {type: 'o3', value: 150},
    {type: 'pm25', value: 115},
    {type: 'pm10', value: 250},
    {type: 'so2', value: 80},
    {type: 'no2', value: 50},
    {type: 'co', value: 2.5},
  ];
  if (list && list.length > 0) {
    let filterList = list.filter((item) => item.isUse && item.isUse === '1' && item.motClaf === stationType);
    if (filterList && filterList) {
      elementList.map((ele) => {
        let type = ele.type;
        if (type === 'pm25') {
          type = 'pm2.5'
        }
        let aqiList = filterList.filter((item) => item.motElement === type);
        let value = 0;
        if (aqiList && aqiList.length > 0) {
          aqiList.map((aqi) => {
            if (value === 0 || value > aqi.valueLow) {
              value = aqi.valueLow
            }
          })
        }
        if (value !== 0) {
          ele.value = value
        }
      })
    }
    return elementList;
  }
}

/**
 * 将阈值塞到list中返回
 * @param list
 * @param type
 * @returns {*[]}
 */
export function getSetValuesList(list, type) {
  //type 1：监测站 2：监测点
  let elementList = [
    {type: 'aqi', value: []},
    {type: 'o3', value: []},
    {type: 'pm25', value: []},
    {type: 'pm10', value: []},
    {type: 'so2', value: []},
    {type: 'no2', value: []},
    {type: 'co', value: []},
  ];
  if (list && list.length > 0) {
    let filterList = list.filter((item) => item.isUse && item.isUse === '1' && item.motClaf === type);
    if (filterList && filterList) {
      elementList.map((ele) => {
        let type = ele.type;
        if (type === 'pm25') {
          type = 'pm2.5'
        }
        let aqiList = filterList.filter((item) => item.motElement === type);
        let valueList = [];
        if (aqiList && aqiList.length > 0) {
          aqiList.map((ii) => {
            valueList.push(ii.valueLow)
          })
        }
        ele.value = valueList
      })
    }
    return elementList;
  }
}
