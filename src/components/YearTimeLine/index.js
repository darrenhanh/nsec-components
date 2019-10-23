import React, {Component} from 'react'
import styles from './style.less'
import {Icon,Slider,Row,Col,Menu,Dropdown,Button} from 'antd'

const width2 = document.body.clientWidth;

class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
      pause: true,
      timeLag: 2000,

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.pause !== this.state.pause && !nextState.pause) {
      this.changeChosenTime(nextProps, nextState);
    }
    return true
  }

  changeChosenTime(nextProps, nextState) {
    let _this = this;
    if (nextState.pause) {
      window.timer && clearTimeout(window.timer);
    } else {
      window.timer = setTimeout(() => {
        let list = nextProps.timeList;
        let index = 0;
        //get newMonth
        let newMonth = _this.props.month + 1;
        let newTime = _this.props.chosenTime;
        if (newMonth > 12) {
          newMonth = 1;
          newTime = newTime + 1;
          if (newTime > (nextProps.beginYear ? nextProps.beginYear+2 : 2017+2)) {
            newTime = nextProps.beginYear ? nextProps.beginYear : 2017
          }
        }
        _this.changeChosenTime({timeList: nextProps.timeList},
          {timeLag: nextState.timeLag ? nextState.timeLag : 300, pause: _this.state.pause, chosenTime: newTime});
        _this.changeChosenTime1(newTime, newMonth)
      }, nextState.timeLag ? nextState.timeLag : 300);
    }
  }

//不用的时候将其解绑
  componentWillUnmount() {
    window.timer && clearTimeout(window.timer);
  }

  showSlider() {
    this.refs.timeSlider.style.display = 'block'
  }

  changeSlider(e) {
    this.setState({timeLag: e * 1000});
    this.refs.timeSlider.style.display = 'none'
  }

  renderYears() {
    const {timeList,chosenTime,month,width}=this.props;
    let k = timeList.length;
    let aWidth = 0;
    if (width) {
      aWidth = (width - 100) / k - 1;
    } else {
      aWidth = (width2 - 100) / k - 1;
    }

    return timeList.map((ii, index)=> {
      return <div className={styles['yearBtn']} style={{width:aWidth}} key={index}
      >
        <div className={styles['monthContainer']} style={{width:aWidth}}>
          {this.renderMonthBtn(ii, aWidth)}
        </div>
        <div className={styles['yearContent']} style={{width:aWidth,background:chosenTime===ii?'#00adb4':'',
      color:chosenTime===ii?'white':'',borderRight:index===timeList.length-1?'none':''}}>{ii}</div>
      </div>
    })
  }

  renderMonthBtn(ii, aWidth) {
    const {month,chosenTime}=this.props;
    let monthList = [];
    for (let i = 0; i < 12; i++) {
      monthList.push(i + 1)
    }
    return monthList.map((item, index)=> {
      return <div className={styles['monthBtn']} key={index} style={{width:aWidth/12,background:chosenTime===ii&&month===item?'#00adb4':'',
      color:chosenTime===ii&&month===item?'white':''}} onClick={()=>this.changeChosenTime1(ii,item)}
      >{item}月
      </div>
    })
  }
  changeChosenTime1(ii,item){
    if(this.props.response){
      this.props.response(ii,item)
    }
  }

  changeBeginYear(e) {
    if (this.props.changeBeginYear) {
      this.props.changeBeginYear(e.item.props.children)
    }
  }

  renderBeginYearList(list) {
    if (list && list.length > 0) {
      return list.map((ii, index)=> {
        return <Menu.Item key={index}>{ii}</Menu.Item>
      })
    }
  }

  render() {
    const {pause}=this.state;
    const {mapTypeEx,width,left,beginYearList,beginYear,chosenTime,month}=this.props;
    const yearMenu = <Menu onClick={(e)=>this.changeBeginYear(e)} style={{overflow:'auto',maxHeight:200}}>
      {this.renderBeginYearList(beginYearList)}
    </Menu>;
    return (
      <div className={styles["timeLine"]} style={{width:width?width:width2,left:left?left:0}}>
        <div className={styles['leftImg']} onClick={()=>this.setState({pause:!pause})}>
          {pause ?
            <Icon type={"caret-right"}
                  style={{fontSize: 21, color: '#fff', lineHeight: '36px',background:'none'}}/> :
            <Icon type={"pause"}
                  style={{fontSize: 21, color: '#fff', lineHeight: '36px',background:'none'}}/>
          }
        </div>
        <div className={styles['timePicker']}>
          <Dropdown overlay={yearMenu} placement="topCenter">
            <Button style={{width:'98%',height:'98%',background:'none',border:'none'}}>
              <img src="image/yearPicker.png" style={{width:'100%',height:'100%'}}/>
            </Button>
          </Dropdown>
        </div>
        <div className={styles['rightYear']} style={{width:width?width-100:width2-100}}>
          {this.renderYears()}
        </div>
      </div>
    )
  }
}

export default TimeLine














