import React, {Component, PureComponent,} from 'react';
import PropTypes from 'prop-types';
import {Calendar} from 'antd';
import moment from 'moment';
import './style.less';
import { getAqiColor,getAqiLevel}from '../../common/aqiColor';

/**
 * 年份日历 (可设置根据数据改变背景色)
 *
 */
export default class DefaultMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lastClickDate: moment()
    };
  }

  render12Month() {
    let monthList = this.getList(12);
    return monthList.map((ii, index)=> {
      return <tr>
        <td className={"monthTd"} key={index}>{ii + 1}月</td>
        {this.render31DayContent(index + 1)}
      </tr>
    })
  }

  getColor(value, eleName) {
    let color = getAqiColor(value);
    return color
  }

  getDateString(year, month, day) {
    let str = year + '';
    if (month > 9) {
      str += month
    } else {
      str += '0' + month
    }
    if (day > 9) {
      str += day
    } else {
      str += '0' + day
    }
    return str
  }

  render31Day() {
    let dayList = this.getList(32);
    return dayList.map((ii, index)=> {
      return <td className={'titleTd'} key={index}>
        {ii === 0 ? '' : ii + '号'}
      </td>
    })
  }

  getPpType() {
    let name = 'PM₂.₅';
    let num = Math.round(Math.random());
    if (num < 0.1) {
      name = 'CO'
    } else if (num < 0.5) {
      name = 'pm10'
    }
    return name
  }


  render31DayContent(month) {
    const {valueList,year,eleName,concentration,level,primaryPollutant}=this.props;
    let dayList = this.getList(31);
    return dayList.map((ii, index2)=> {
      let dateString = this.getDateString(year, month, index2 + 1);
      let value = valueList[dateString] || valueList[dateString] === 0 ? valueList[dateString] : '';
      let isValid = moment(dateString, 'YYYYMMDD').isValid();//判断日期 是否合法
      let isNoData = value === '';
      let backgroundColor = !isNoData ? this.getColor(value, eleName) : '#f3f3f3';// 无数据时背景色
      let color = backgroundColor === '#feff01' ? 'black' : 'white';
      let ppType = this.getPpType();
      let ppLevel = getAqiLevel(value);
      return <td key={index2}
                 className={"dayContentTd"}>
        <div className={"tdDiv"} style={!isValid?{}:{background:backgroundColor,color:color}}>
          {backgroundColor != '#f3f3f3' && backgroundColor != 'white' && <div style={{textAlign:'center',fontSize:12}}>
            <div>
              {level ? ppLevel : ' '}
            </div>
            <div>
              {primaryPollutant ? ppType : ' '}
            </div>
            <div>
              {concentration ? value : ' '}
            </div>
          </div>}
        </div>
      </td>
    })
  }

  getList(length) {
    let list = [];
    for (let i = 0; i < length; i++) {
      list.push(i)
    }
    return list
  }

  render() {

    return (
      <table className={'yearCalendar'}>
        <tbody>
        <tr className={"titleTr"}>
          {this.render31Day()}
        </tr>
        {this.render12Month()}
        </tbody>
      </table>
    )
  }
}


DefaultMenu.propTypes = {
  chosenDate: PropTypes.object.isRequired,
  changeChosenDate: PropTypes.func.isRequired,
  valueList: PropTypes.object.isRequired,
  /* label: PropTypes.string.isRequired,
   sortState: PropTypes.object.isRequired,
   sortKey: PropTypes.string.isRequired,
   toggleDirection: PropTypes.func.isRequired*/
};
