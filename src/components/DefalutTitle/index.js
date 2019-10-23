import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default function DefaultTitle(props) {
  const style = {
    fontSize: 16,
    fontWeight: 600,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  };
  if (props.textAlign) {
    style.textAlign = props.textAlign;
  }
  if (props.padding || props.padding === 0) {
    style.padding = props.padding;
  }
  console.log("sss")
  return (
    <div style={style}>
      <span>
        {props.title}
      </span>
      {props.children}
    </div>
  )
}

DefaultTitle.propTypes = {
  title: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
  padding: PropTypes.number,
};
