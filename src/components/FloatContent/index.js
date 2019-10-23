import './style.less';
import React, {Component, PureComponent,} from 'react';

export default function FloatContent(props) {

  const style = {
  };
  if (props.top) {
    style.top = props.top;
  }
  if (props.left) {
    style.left = props.left;
  }
  if (props.right) {
    style.right = props.right;
  }
  if (props.bottom) {
    style.bottom = props.bottom;
  }
  if (props.background) {
    style.background = props.background;
  }
  return (
    <div className={"floatContent"} style={style}>
      {props.children}
    </div>
  )
}
