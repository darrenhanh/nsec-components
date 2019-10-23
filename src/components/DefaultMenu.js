import React, {Component, PureComponent,} from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon, Button} from 'antd';

/**
 * 默认菜单（深色背景，单层菜单）
 * PureComponent在组件props\state较为简单时使用，只进行浅比较，需要深比较的地方会出错
 */
export default class DefaultMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,

    };
  }

  callback(e) {
    if (this.props.callback) {
      this.props.callback(e);
    }
  }

  render() {
    const {menuList} = this.props;
    const listMenuItem = menuList && menuList.length > 0 && menuList.map((menuItem) =>
      <Menu.Item key={menuItem.key} name={menuItem.name}>
        <span>{menuItem.name}</span>
      </Menu.Item>);

    return (
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        style={{height: '100%',}}
        inlineCollapsed={this.state.collapsed}
        onSelect={(e) => this.callback(e)}
      >
        {listMenuItem}
      </Menu>
    )
  }
}


DefaultMenu.propTypes = {
  menuList: PropTypes.array.isRequired,
  callback: PropTypes.func,
  /* label: PropTypes.string.isRequired,
   sortState: PropTypes.object.isRequired,
   sortKey: PropTypes.string.isRequired,
   toggleDirection: PropTypes.func.isRequired*/
};
