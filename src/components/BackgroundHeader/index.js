import './style.less';
import React, {Component, PureComponent,} from 'react';

export default function BackgroundHeader(props) {
  const style = {
    height: 50,
    padding: 13,
    background: props.color
  };
  if (props.size) {
    if(props.size === 'big'){
      style.height = 70;
      style.padding = 23;
    }
  }

  if (props) {
    return (
      <div className={"backgroundHeader"} style={style}>
      <span className={"title"}>
              {props.title}
      </span>
        {props.children}
      </div>
    )
  }

}
