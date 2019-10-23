import React, {Component} from 'react'
import {Icon, notification, Slider} from 'antd'
import moment from 'moment';
import PropTypes from 'prop-types';

import './style.less'

const marks = {
  1: '1s',
  2: '2s',
  3: '3s',
  4: '4s',
  5: '5s',
};

/**
 * 三天或七天的时间控件(实况，过去的)
 */
export default class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIx: 12,
      pause: true,
      time: 2000,
      timeMode: 3,
      day: 0,

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
    let {selectedIx, pause, time, timeMode, day,} = state;
    const _this = this;
    if (!pause) {
      if (selectedIx >= 71) {
        _this.setState({pause: true})
      } else {
        window.timer = window.setTimeout(function () {
          if (timeMode === 3) {
            _this.setState({selectedIx: selectedIx + 1,});
            if (_this.props.timingHandler) {
              _this.props.timingHandler({selectedIx: selectedIx + 1,})
            }
          } else {
            _this.setState({day: day + 1,});
            if (_this.props.timingHandler) {
              _this.props.timingHandler({day: day + 1,})
            }
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
    let {selectedIx} = this.state;
    let list = [];
    for (let i = 0; i < 24; i++) {
      list.push({ix: i, dayIx})
    }
    return list.map((item) => {
      return (
        <span className={"scaleText"}
              onClick={this.chooseTime.bind(this, item, item.dayIx === 2 && (parseInt(moment().format("HH")) < item.ix))}
              style={{background: ((item.dayIx) * 24 + item.ix <= selectedIx) ? 'rgb(40,136,212)' : '#ddd',}}
        >
        {item.ix}
        </span>
      )
    });
  }

  chooseTime(time, check) {
    if (!check) {
      let selectedIx = time.dayIx * 24 + time.ix;
      time.selectedIx = selectedIx;
      window.timer && clearTimeout(window.timer);
      this.setState({selectedIx, pause: true});
      if (this.props.changeValue) {
        this.props.changeValue(time);
      }
    } else {
      notification.warning({message: '尚未取到此时数据'});
    }
  }

  changeDate(day) {
    let {selectedIx} = this.state;
    selectedIx = selectedIx % 24 + day * 24;
    this.setState({selectedIx});
  }

  changeStatus() {
    console.log("zzz");
    window.timer && clearTimeout(window.timer);
    this.setState({pause: !this.state.pause});
  }

  showSlider() {
    this.refs.timeSlider.style.display = 'block';
  }

  changeSlider(e) {
    this.setState({time: e * 1000});
    this.refs.timeSlider.style.display = 'none';
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
    if (this.props.changeValue) {
      this.props.changeValue({day: ix});
    }
    this.setState({day: ix});
  }

  getStyle(ix) {
    const {day,} = this.state;
    return day >= ix ? {background: 'rgb(40,136,212)'} : {};
  }

  render() {
    let {width, bottom, timeChangeCheck, left, height,} = this.props;
    let {selectedIx, pause, timeMode} = this.state;
    if (!bottom) {
      bottom = 0
    }

    let timeContentWidth = width - 80, marginLeft = 80;
    if (timeChangeCheck) {
      timeContentWidth = timeContentWidth - 40;
      marginLeft = marginLeft - 40;
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
    const timeLine = {
      width, bottom
    };
    if (left) {
      timeLine.left = left;
    }
    if (height) {
      timeLine.height = height;
    }
    return (
      <div className={"lastTimeLine"} style={timeLine}>
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
            {timeMode === 3 ? "逐时" : "逐日"}
          </span>
        </div>
        {
          timeMode === 3 &&
          <div className={'timeContent'} style={{width: timeContentWidth, marginLeft}}>
            {
              [1, 2, 3].map((ii) => (
                <div className={'timeBlock'}>
                  <div className={'time'}>
                    {this.renderScale(ii - 1)}
                  </div>
                  <p onClick={this.changeDate.bind(this, ii - 1)}
                     style={Math.floor(selectedIx / 24) >= ii - 1 ? {background: 'rgb(40,136,212)'} : {}}
                  >
                    {moment().subtract('days', 3 - ii).format("MM月DD日")}
                  </p>
                </div>
              ))
            }
          </div>
        }
        {
          timeMode === 7 &&
          <div className={'rightDateTent'} style={{width: timeContentWidth, marginLeft}}>
            {
              [6, 5, 4, 3, 2, 1, 0].map((day) => (
                <div className={'rightDate'} onClick={this.chooseDate.bind(this, day)}
                     style={this.getStyle(day)}
                >
                  {moment().subtract('days', 6 - day).format("MM月DD日")}
                </div>
              ))
            }
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
  timeChangeCheck: PropTypes.boolean,
};
