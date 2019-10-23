import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal, Button} from 'antd';
import "./style.less";

export default class SimpleModal extends Component {

  render() {
    const {title,visible,handleOk,handleCancel,style,} = this.props;
    console.log("style",style)
    return (
        <Modal
          style={style}
          className={"simpleModal"}
          title={title}
          visible={visible}
          // onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          // okText={"确认"}
          // cancelText={"取消"}
        >
          {this.props.children}
        </Modal>
    )
  }
}

