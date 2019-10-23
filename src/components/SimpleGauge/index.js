import React, {Component} from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';
import {getAqiColor} from "../../common/aqiColor";

/**
 * 简单仪表盘
 */
export default class SimpleGauge extends Component {
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
    const {titleText, xData, seriesName, seriesData, rangeData, xName, yName, value,} = props;

    let currentColor = '#5DD1FA';
    if (value) {
      currentColor = getAqiColor(value);
    }

    let chart = echarts.init(this.refs.eChartCon);
    let data = {
      value: value,
      total: 500,
    };
    // 绘制图表
    let option = {
      backgroundColor: '#fff',
      grid: {
        left: 0,
        bottom: 0,
      },
      series: [{
        name: "仪表盘",
        type: "gauge",
        radius: "100%",
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: [
              [data.value / data.total, currentColor], //外环基础色
              [1, "#f7f9fc"]
            ],
            width: 7,
          }
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        itemStyle: {
          show: false,
        },
        detail: {
          formatter: function (value) {
            return `${value}`
          },
          offsetCenter: [0, 0],
          textStyle: {
            fontSize: '26',
            fontWeight: '600',
            color: 'black'
          },
        },
        title: {
          offsetCenter: [0, "70%"],
          textStyle: {
            fontSize: '12',
            fontWeight: '500',
            color: 'black'
          },
        },
        pointer: {
          show: false,
          length: '95%',
        },
        data: [{
          "name": "AQI",
          "value": data.value,
        }]
      }
      ]
    };

    console.log("option:::", option);
    chart.setOption(option)
  }

  render() {
    const {height,} = this.props;
    return (
      <div ref={"eChartCon"} style={{width: "100%", height: height}}>

      </div>
    )
  }
}

SimpleGauge.propTypes = {
  // xData: PropTypes.array.isRequired,
  // seriesData: PropTypes.array.isRequired,
  // height: PropTypes.number.isRequired,
  // rangeData: PropTypes.array,
  // seriesName: PropTypes.string,
  // titleText: PropTypes.string,

};
