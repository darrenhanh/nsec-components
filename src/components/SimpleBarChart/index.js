import React, {Component} from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';

/**
 * 简单柱状图
 */
export default class SimpleLineChart extends Component {
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
    const {titleText, xData, seriesName, seriesData, rangeData, xName, yName, gridBottom,} = props;
    let chart = echarts.init(this.refs.bar);

    // 绘制图表
    let option = {
      title: {
        text: titleText,
        left: 10,
        textStyle: {
          color: 'black',
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 30,
        top: 40,
        // right: '0%',
        // bottom: 5,//'0%',
        // top: '25%',
        // containLabel: true
      },
      toolbox: {
        show: false,
        top: 20,
        right: 0,
        feature: {
          magicType: {show: true, type: ['line', 'bar']},
        }
      },
      xAxis: {
        type: 'category',
        name: xName,
        // boundaryGap: false,
        data: xData ? xData : ['无数据'],
      },
      yAxis: {
        type: 'value',
        name: yName,
      },
      series: [
        {
          name: seriesName ? seriesName : "",
          type: 'bar',
          // barWidth:30,
          // stack: '总量',
          data: seriesData ? seriesData : [],
        },
      ]
    };

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
    if (gridBottom) {
      option.grid.bottom = gridBottom;
    }
    console.log("option:::", option);
    chart.setOption(option)
  }

  render() {
    const {height,} = this.props;
    return (
      <div ref={"bar"} style={{width: "100%", height: height}}>

      </div>
    )
  }
}

SimpleLineChart.propTypes = {
  xData: PropTypes.array.isRequired,
  seriesData: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  rangeData: PropTypes.array,
  seriesName: PropTypes.string,
  titleText: PropTypes.string,

};
