import React, {Component, PureComponent,} from 'react';

export function PaddingSpan(props) {
  const style = {
    paddingLeft: 15,
    paddingRight: 5,
  };
  return (
    <span style={style}>
      {props.children}
    </span>
  )
}
