import React, {Component} from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';

/**
 * 多条折线图
 */
export default class MultiLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.showChart(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.showChart(nextProps)
  }

  showChart(props) {
    // 基于准备好的dom，初始化echarts实例
    const {titleText, xData, seriesData, colorList, yName, xName, rangeData, legendData,} = props;
    let chart = echarts.init(this.refs.line);

    // 绘制图表
    let option = {
      title: {
        text: titleText,
        left: 0,
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 0,
        right: 55,
        bottom: 5,//'0%',
        top: '15%',
        containLabel: true
      },
      legend: {
        data: legendData,//['邮件营销', '联盟广告', '视频广告',]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        name: xName,
        data: xData,//['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        name: yName,
      },
      series: [],
    };
    if (seriesData) {
      seriesData.map((data) => {
        option.series.push(
          {
            name: data['name'],
            type: 'line',
            smooth: true,
            data: data['data'],
          }
        )
      });
    }
    if (colorList && colorList.length > 0) {
      option.color = colorList;
    }
    if (rangeData && rangeData.length > 0) {
      option.series[0].markLine = {
        silent: true,
        data: [
          {yAxis: rangeData[3]},
        ],
      };
      //柱状图分色
      option.series[0].itemStyle = {
        normal: {
          color: function (params) {
            if (params && params.value) {
              if (params.value < rangeData[1]) {
                return "#02E100";
              } else if (params.value > rangeData[1] && params.value <= rangeData[2]) {
                return "rgb(236,218,48)";
              } else if (params.value > rangeData[2] && params.value <= rangeData[3]) {
                return "rgb(255,127,0)";
              } else if (params.value > rangeData[3] && params.value <= rangeData[4]) {
                return "rgb(252,0,2)";
              } else if (params.value > rangeData[4] && params.value <= rangeData[5]) {
                return "rgb(150,0,75)";
              } else if (params.value > rangeData[5]) {
                return "rgb(127,3,31)";
              }
            }
          },
        }
      };
    }

    console.log("option:::", option);
    chart.setOption(option)
  }

  render() {
    const {height,} = this.props;
    return (
      <div ref={"line"} style={{width: "100%", height: height}}>

      </div>
    )
  }
}

MultiLineChart.propTypes = {
  xData: PropTypes.array.isRequired,
  seriesData: PropTypes.array.isRequired,
  legendData: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  titleText: PropTypes.string,
  rangeData: PropTypes.array,
  colorList: PropTypes.array,

};
