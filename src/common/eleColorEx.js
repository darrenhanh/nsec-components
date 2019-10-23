
/**
 * 获取aqi及六参数的等级颜色
 * @param ele
 * @param num
 * @returns {*}
 */
export function  geteleColor(ele,num){
  let color="#dadada";
  if (num==='首要污染'){
    color = '#7f031f';
    return  color
  }else if (ele==='AQI'){
    if (num >= 0 && num <= 50) {
     color = '#02e300'
    } else if (num > 50 && num <= 100) {
     color = '#feff01'
    } else if (num > 100 && num <= 150) {
     color = '#ff7f00'
    } else if (num > 150 && num <= 200) {
      color = '#fe0002'
    } else if (num > 200 && num <= 300) {
      color = '#98004b'
    } else if (num > 300) {
      color = '#7f031f'
    }
    return color

  } else if(ele==='SO₂'){
    if (num >= 0 && num <= 50) {
      color = '#02e300'
    } else if (num > 50 && num <= 150) {
      color = '#feff01'
    } else if (num > 150 && num <= 475) {
      color = '#ff7f00'
    } else if (num > 475 && num <= 800) {
      color = '#fe0002'
    } else if (num > 800 && num <= 1600) {
      color = '#98004b'
    } else if (num > 1600) {
      color = '#7f031f'
    }
    return color
  }else if(ele==='NO₂'){
    if (num >= 0 && num <= 40) {
      color = '#02e300'
    } else if (num > 40 && num <= 80) {
       color = '#feff01'
    } else if (num > 80 && num <= 180) {
       color = '#ff7f00'
    } else if (num > 180 && num <= 280) {
      color = '#fe0002'
    } else if (num > 280 && num <= 565) {
      color = '#98004b'
    } else if (num > 565) {
      color = '#7f031f'
    }
    return color
  }else if(ele==='CO'){
    if (num >= 0 && num <= 2) {
      color = '#02e300'
    } else if (num > 2 && num <= 4) {
       color = '#feff01'
    } else if (num > 4 && num <= 14) {
      color = '#ff7f00'
    } else if (num > 14 && num <= 24) {
      color = '#fe0002'
    } else if (num > 24 && num <= 36) {
      color = '#98004b'
    } else if (num > 36) {
      color = '#7f031f'
    }
    return color
  }else if(ele==='PM₁₀'){
    if (num >= 0 && num <= 50) {
       color = '#02e300'
    } else if (num > 50 && num <= 150) {
       color = '#feff01'
    } else if (num > 150 && num <= 250) {
      color = '#ff7f00'
    } else if (num > 250 && num <= 350) {
      color = '#fe0002'
    } else if (num > 350 && num <= 420) {
      color = '#98004b'
    } else if (num > 420) {
      color = '#7f031f'
    }
    return color
  }else if(ele==='PM₂.₅'){
    if (num >= 0 && num <= 35) {
      color = '#02e300'
    } else if (num > 35 && num <= 75) {
      color = '#feff01'
    } else if (num > 75 && num <= 115) {
      color = '#ff7f00'
    } else if (num > 115 && num <= 150) {
      color = '#fe0002'
    } else if (num > 150 && num <= 250) {
      color = '#98004b'
    } else if (num > 250) {
      color = '#7f031f'
    }
    return color
  }else if(ele==='O₃'){
    if (num >= 0 && num <= 160) {
      color = '#02e300'
    } else if (num > 160 && num <= 200) {
      color = '#feff01'
    } else if (num > 200 && num <= 300) {
     color = '#ff7f00'
    } else if (num > 300 && num <= 400) {
      color = '#fe0002'
    } else if (num > 400 && num <= 800) {
      color = '#98004b'
    } else if (num > 800) {
      color = '#7f031f'
    }
    return color
  }else if(ele==='airLevel'){
    if (num ==='优') {
      color = '#02e300'
    } else if (num ==='良') {
      color = '#feff01'
    } else if (num ==='中') {
       color = '#ff7f00'
    } else if (num ==='轻度污染') {
      color = '#fe0002'
    } else if (num ==='中度污染') {
      color = '#98004b'
    } else if (num ==='重度污染') {
      color = '#7f031f'
    }
    return color
  }
}
