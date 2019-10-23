import React, {Component} from 'react'
import {Icon, notification, Slider} from 'antd'
import moment from 'moment';
import PropTypes from 'prop-types';

import * as styles from './style.less'

const marks = {
  1: '1s',
  2: '2s',
  3: '3s',
  4: '4s',
  5: '5s',
};

/**
 * 三天或七天的时间控件（预报，未来的）
 */
export default class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIx: 12,
      pause: true,
      time: 2000,
      forecastTime: '',
      timeMode: 3,

    }
  }

  componentWillMount() {
    if (!this.props.realTime) {
      this.chooseTime({dayIx: 0, ix: 12})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.pause !== this.state.pause && !nextState.pause) {
      this.timingHandler(nextProps, nextState)
    }
    if (nextState.selectedIx !== this.state.selectedIx && !nextState.pause) {
      this.timingHandler(nextProps, nextState)
    }
    return true;
  }

  timingHandler(props, state) {
    let {selectedIx, pause, time} = state;
    const _this = this;
    if (!pause) {
      if (selectedIx >= 79) {
        _this.setState({pause: true})
      } else {
        window.timer = window.setTimeout(function () {
          let forecastTime = _this.getForecastTime(selectedIx + 1, _this.props.selectedDay);
          _this.setState({selectedIx: selectedIx + 1, forecastTime});
          if (_this.props.timingHandler) {
            moment.locale('zh-cn');
            let realTime = moment(forecastTime, 'YYYYMMDDHH').format("YYYY-MM-DD HH:00:00");
            _this.props.timingHandler({selectedIx: selectedIx + 1, realTime, forecastTime})
          }
        }, time);
      }
    }
  }

  //不用的是时候将其解绑
  componentWillUnmount() {
    window.timer && clearTimeout(window.timer)
  }

  renderScale(dayIx) {
    const {mode} = this.props;
    let {selectedIx} = this.state;
    let list = [];
    for (let i = 0; i < 24; i++) {
      list.push({ix: i, dayIx})
    }
    if (mode === 'realTime') {
      return list.map((item) => {
        return (
          <span className={"scaleText"}
                onClick={this.chooseTime.bind(this, item, item.dayIx === 2 && (parseInt(moment().format("HH")) < item.ix))}
                style={{
                  background: (item.dayIx * 24 + item.ix <= selectedIx) ? 'rgb(40,136,212)' : '#ddd',
                }}
          >
        {item.ix}
        </span>
        )
      })
    } else {
      return list.map((item) => {
        return (
          <span className={"scaleText"} onClick={this.chooseTime.bind(this, item, false)}
                style={(item.dayIx * 24 + item.ix <= selectedIx) ? {background: 'rgb(40,136,212)'} : {}}
          >
        {item.ix}
        </span>
        )
      })
    }
  }

  chooseTime(time, check) {
    if (!check) {
      let selectedIx = time.dayIx * 24 + time.ix;
      time.selectedIx = selectedIx;
      let forecastTime = this.getForecastTime(selectedIx, this.props.selectedDay);
      time.forecastTime = forecastTime;
      this.setState({selectedIx, forecastTime, pause: true});
      window.timer && clearTimeout(window.timer);
      moment.locale('zh-cn');
      time.realTime = moment(forecastTime, 'YYYYMMDDHH').format("YYYY-MM-DD HH:00:00");
      if (this.props.changeValue) {
        this.props.changeValue(time);
      }
    } else {
      notification.warning({message: '尚未取到此时数据'});
    }
  }

  getForecastTime(selectedIx, selectedDay) {
    if (!selectedDay) {
      selectedDay = moment().format('YYYYMMDD')
    }
    let dayIx = Math.floor(selectedIx / 24) + 1;
    let timeIx = selectedIx % 24;
    if (timeIx < 10) {
      timeIx = '0' + timeIx
    }
    return moment(selectedDay).add('day', dayIx).format('YYYYMMDD') + timeIx
  }

  changeDate(day) {
    let {selectedIx} = this.state;
    selectedIx = selectedIx % 24 + day * 24;
    this.setState({selectedIx})
  }

  changeStatus() {
    window.timer && clearTimeout(window.timer);
    this.setState({pause: !this.state.pause})
  }

  showSlider() {
    this.refs.timeSlider.style.display = 'block'
  }

  changeSlider(e) {
    this.setState({time: e * 1000});
    this.refs.timeSlider.style.display = 'none'
  }

  changeTimeMode() {
    if (this.state.timeMode === 3) {
      this.setState({timeMode: 7});
    } else {
      this.setState({timeMode: 3});
    }
  }

  chooseDate(ix) {
    //根据起始时间和第几天获取选中日期，然后调用后台
    let date = moment().add('days', ix)
  }

  render() {
    let {width, bottom, mode, timeChangeCheck,left,height,} = this.props;
    let {selectedIx, pause, timeMode} = this.state;
    if (!bottom) {
      bottom = 0
    }

    let timeContentWidth = width - 80, marginLeft = 80;
    if (mode && mode === 'home') {
      timeContentWidth = timeContentWidth - 40 * 2;
      marginLeft = marginLeft + 40 * 2
    }
    if (timeMode === 7) {
      timeContentWidth = timeContentWidth - 80 * 4
    }
    const rightCaret = {
      fontSize: 28, paddingTop: 1, color: '#fff', lineHeight: '28px',
    };
    const pauseIcon = {
      fontSize: 24, paddingTop: 2, color: '#fff',
    };
    const timeSlider = {
      height: 125, width: 45, position: 'absolute', display: 'none', bottom: 65,
    };
    const timeLine={
      width, bottom
    };
    if(left){
      timeLine.left=left;
    }
    if(height){
      timeLine.height=height;
    }
    return (
      <div className={"timeLine"} style={timeLine}>
        <div className={'ck60'} onClick={this.changeStatus.bind(this)}>
          {pause ? <Icon type={"caret-right"} style={rightCaret}/> : <Icon type={"pause"} style={pauseIcon}/>}
        </div>
        {
          timeChangeCheck &&
          <div className={'ck60'}>
            <Icon type="clock-circle" style={pauseIcon} onClick={this.showSlider.bind(this)}/>
            <div ref='timeSlider' style={timeSlider}>
              <Slider vertical marks={marks}
                      min={1} max={5} onAfterChange={this.changeSlider.bind(this)}/>
            </div>
          </div>
        }
        <div className={'ck60'} onClick={this.changeTimeMode.bind(this)}>
          <span className={'number'}>
            {timeMode === 3 ? "预3" : "预7"}
          </span>
        </div>
        <div className={'timeContent'} style={{width: timeContentWidth, marginLeft}}>
          <div className={'timeBlock'}>
            <div className={'time'}>
              {this.renderScale(1)}
            </div>
            <p onClick={this.changeDate.bind(this, 1)}
               style={Math.floor(selectedIx / 24) >= 1 ? {background: 'rgb(40,136,212)'} : {}}
            >
              {moment().add('days', 0).format("MM月DD日")}
            </p>
          </div>
          <div className={'timeBlock'}>
            <div className={'time'}>
              {this.renderScale(2)}
            </div>
            <p onClick={this.changeDate.bind(this, 2)}
               style={Math.floor(selectedIx / 24) >= 2 ? {background: 'rgb(40,136,212)'} : {}}
            >
              {moment().add('days', 1).format("MM月DD日")}
            </p>
          </div>
          <div className={'timeBlock'}>
            <div className={'time'}>
              {this.renderScale(3)}
            </div>
            <p onClick={this.changeDate.bind(this, 3)}
               style={Math.floor(selectedIx / 24) >= 3 ? {background: 'rgb(40,136,212)'} : {}}
            >
              {moment().add('days', 2).format("MM月DD日")}
            </p>
          </div>
        </div>
        {
          timeMode === 7 &&
          <div className={'rightDateTent'}>
            <div className={'rightDate'} onClick={this.chooseDate.bind(this, '6')}>
              {moment().add('days', 6).format("MM月DD日")}
            </div>
            <div className={'rightDate'} onClick={this.chooseDate.bind(this, '5')}>
              {moment().add('days', 5).format("MM月DD日")}
            </div>
            <div className={'rightDate'} onClick={this.chooseDate.bind(this, '4')}>
              {moment().add('days', 4).format("MM月DD日")}
            </div>
            <div className={'rightDate'} onClick={this.chooseDate.bind(this, '3')}>
              {moment().add('days', 3).format("MM月DD日")}
            </div>
          </div>
        }
      </div>
    )
  }
}

TimeLine.proptTypes = {
  selectedDay: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  timingHandler: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,

};
