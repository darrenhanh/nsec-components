import React, {useState} from 'react';
import {Card, Col,} from 'antd';
import moment from 'moment';
import {elementList, getElementData} from "./constant/commonList";
import DefaultMenu from './components/DefaultMenu';
// import Header from './components/Header/index.jsx';
import TimeLine from './components/TimeLine';
import FloatTitle from './components/FloatTitle';
import SimpleLineChart from './components/SimpleLineChart';
import DefalutTitle from './components/DefalutTitle';
import SelectOption from "./components/SelectOption";
import SwitchButton from "./components/SwitchButton";
import BackgroundHeader from "./components/BackgroundHeader";
import MultiLineChart from "./components/MultiLineChart";
import FloatContent from "./components/FloatContent";
import SimpleBarChart from "./components/SimpleBarChart";
import {createRandomList} from "./common/dispatch";
import ImgContent from "./components/ImgContent";
import SimpleGauge from './components/SimpleGauge';
import TabsSelect from './components/TabsSelect';
import {Test} from './components/Test';
import {PaddingSpan} from "./components/PaddingSpan";

const width = document.body.clientWidth;

/**
 * 组件示例数据
 */

function changeValue(time) {
  console.log("time", time);
}

function timingHandler(time) {
  console.log("time", time);
}

let rangeData = getElementData("aqi");

export const defaultMenuList = [
  {key: '1', name: '站点地图', path: '',},
  {key: '2', name: '数据审核', path: '',},
  {key: '3', name: '沙尘剔除', path: '',},
];
const optionList = [
  {key: "2014", name: "2014",},
  {key: "2015", name: "2015",},
  {key: "2016", name: "2016",},
  {key: "2017", name: "2017",},
  {key: "2018", name: "2018",},
  {key: "2019", name: "2019",},
];

const buttonList = [
  {key: "水源涵养", name: "水源涵养功能区",},
  {key: "水土保持", name: "水土保持功能区",},
  {key: "防风固沙", name: "防风固沙功能区",},
  {key: "生物多样性", name: "生物多样性维护功能区",},
];
const xData = [
  2014, 2015, 2016, 2017, 2018
];
const seriesData = [
  {name: "极重要", data: [1, 2, 3, 5, 6],},
  {name: "重要", data: [4, 6, 3, 7, 8],},
  {name: "一般重要", data: [5, 7, 3, 9, 7],},

];


/**
 * 组件示例数据
 */

/**
 * 组件列表
 * @type {*[]}
 */
const componentList = [
  {title: "默认菜单", component: <DefaultMenu menuList={defaultMenuList}/>,},
  // {title: "默认头部", component: <Header/>,},
  {
    title: "时间控件",
    component: <TimeLine
      width={width - 50}
      selectedDay={moment().format("YYYYMMDD")}
      changeValue={(data) => changeValue(data)}
      timingHandler={(data) => timingHandler(data)}
    />,
  },
  {
    title: "简单折线图",
    component: <SimpleLineChart
      height={250}
      titleText={"简单折线图"}
      xData={[1, 2, 3, 4, 5]}
      seriesData={[1, 2, 3, 4, 5]}
      rangeData={rangeData}
      seriesName={"示例数据"}
    />,
  },
  {title: "漂浮标题", component: <FloatTitle title={"漂浮标题"}/>,},
  {title: "默认标题", component: <DefalutTitle title={"默认标题"}/>,},
  {title: "下拉选择", component: <SelectOption optionList={optionList}/>,},
  {title: "单选按钮", component: <SwitchButton buttonList={buttonList}/>,},
  {
    title: "多条折线图",
    component: <div style={{width: 800,}}>
      <MultiLineChart
        height={200}
        legendData={["极重要", "重要", "一般重要"]}
        xData={xData}
        seriesData={seriesData}
        yName={"面积"}
        xName={"年份"}
        colorList={["red", "yellow", "blue"]}
      />
    </div>,
  },
  {
    title: "简单柱状图",
    component: <SimpleBarChart titleText={"小时数据"} xData={["选项1", "选项2", "选项3", "选项4", "选项5",]}
                               seriesData={createRandomList(5, 1, 10)} height={300}
                               xName={"单位"} yName={"单位"}
    />,
  },
  {
    title: "单张图片", component: <div style={{height: 300,}}>
      <ImgContent imgUrl={"public/img/map_aqi.png"} imgWidth={"100%"}/>
    </div>,
  },
  {title: "简单仪表盘", component: <SimpleGauge height={300}/>,},
  {title: "Tab选择", component: <TabsSelect size={"small"} tabList={elementList}/>,},
  {title: "测试新功能", component: <Test/>,},
  {title: "可扩展头", component: <BackgroundHeader title={"历史数据"} color={"#fff"}>测试</BackgroundHeader>,},
  {title: "间隔span", component: <PaddingSpan/>,},


];

/**
 * 组件卡片
 * @constructor
 */
function ComponentCard(props) {
  return (
    <Card title={props.title} style={{width: width - 50, margin: 20,}}>
      {props.component}
    </Card>
  );
}

/**
 * 组件示例及效果页
 */
export default function Components() {
  return (
    <div>
      {
        componentList && componentList.length > 0 && componentList.map((component) => {
          return <ComponentCard {...component}/>
        })
      }
    </div>
  )
}

