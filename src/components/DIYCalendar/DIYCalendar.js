import React, {Component, PureComponent,} from 'react';
import PropTypes from 'prop-types';
import {Calendar} from 'antd';
import moment from 'moment';
import './style.less';
import { getAqiColor,getAqiLevel}from '../../common/aqiColor';

/**
 * 日历 (可多选、可设置根据数据改变背景色)
 *可使用内联样式
 */
export default class DefaultMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lastClickDate: moment()
    };
  }

  isDisabled(dateObj, disabledDateObj) {
    let compareDateStr = dateObj.format('YYYYMMDD');
    let disabledDateStr = disabledDateObj.format('YYYYMMDD');
    if (parseInt(compareDateStr) > parseInt(disabledDateStr)) {
      return true
    } else {
      return false
    }
  }

  changeChosenDate(dateObj) {
    if (this.props.changeChosenDate) {
      this.props.changeChosenDate(dateObj);
    }
    this.setState({lastClickDate: dateObj})
  }

  judgeIsChosenDate(dateObj, chosenDate, formatStr) {
    let isChosenDate = false;
    if (chosenDate && chosenDate.length > 0) {
      chosenDate.map((ii)=> {
        if (ii.format(formatStr) === dateObj.format(formatStr)) {
          isChosenDate = true
        }
      })
    }
    return isChosenDate
  }

  emptyFunction() {
    //do noting
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



  renderDateContent(dateObj, chosenDate, valueList) {
    const {lastClickDate}=this.state;
    const {concentration,level,primaryPollutant}=this.props;
    let isChosenDate = this.judgeIsChosenDate(dateObj, chosenDate, 'YYYYMMDD');
    let isChosenMonth = this.judgeIsChosenDate(dateObj, [lastClickDate], 'YYYYMM');
    let dateValue = valueList[dateObj.format('YYYYMMDD')] ? valueList[dateObj.format('YYYYMMDD')] : '';
    let disabled = this.isDisabled(dateObj, moment());
    let backgroundColor = isChosenMonth && !disabled ? getAqiColor(dateValue) : 'white';
    let color = backgroundColor === '#feff01' ? 'black' : 'white';
    let ppType = this.getPpType();
    let ppLevel = getAqiLevel(dateValue);
    return <div className="container"
                onClick={disabled?()=>this.emptyFunction():()=>this.changeChosenDate(dateObj)}
                style={{background:backgroundColor,
                border:isChosenDate?'2px solid #2988d3':'2px solid #aaa',
                cursor: disabled?'not-allowed':'pointer',
                color:color}}>
      <div className="dateTip">
        {dateObj.format('DD')}
      </div>
      <div className="dateValue" >
        <div>
          {level ? ppLevel : ' '}
        </div>
        <div>
          {primaryPollutant ? ppType : ' '}
        </div>
        <div>
          {concentration ? dateValue : ' '}
        </div>
      </div>
    </div>
  }

  onPanelChange(value, mode) {
    console.log('onPanelChange', value, mode)
  }

  render() {
    const {chosenDate,style,valueList}=this.props;
    const {lastClickDate}=this.state;
    return (
      <Calendar fullscreen={false}
                defaultValue={lastClickDate}
                className="DIYCalendar"
                style={style?{...style}:{}}
                disabledDate={(dateObj)=>this.isDisabled(dateObj,moment())}
        //onChange={(dateObj)=>this.changeChosenDate(dateObj)}
                dateFullCellRender={(dateObj)=>this.renderDateContent(dateObj,chosenDate,valueList)}
                onPanelChange={(value, mode)=>this.onPanelChange(value, mode)}/>
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
