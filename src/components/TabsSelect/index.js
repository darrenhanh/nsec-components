import PropTypes from 'prop-types';
import {Tabs} from 'antd';
import './style.less';
import React, {Component, PureComponent,} from 'react';

const {TabPane} = Tabs;


/**
 * Tab样式的选择组件
 * @param props
 * @returns {*}
 * @constructor
 */
export default function TabsSelect(props) {
  let style = {
    height: 40,

  };
  if (props.height) {
    style.height = props.height;
  }

  function callback(key) {
    console.log(key);
    if (props.onChange) {
      props.onChange(key);
    }
  }

  return (
    <>
      <Tabs className={"tabsSelect"}
            size={props.size}
            defaultActiveKey="1"
            onChange={callback}
            style={style}>

        {
          props.tabList.map((tab) =>
            (
              <TabPane tab={tab.name} key={tab.key}/>
            ))
        }
      </Tabs>
    </>
  )
}

TabsSelect.propTypes = {
  size: PropTypes.string.isRequired,
  tabList: PropTypes.array.isRequired,
  onChange:PropTypes.func,

};
