import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';

/**
 * 标题
 * @param props
 * @returns {*}
 * @constructor
 */
export default function FloatTitle(props) {
  const style = {
    background: "rgba(182, 181, 179, 0.6)",
  }
  if (props.background) {
    style.background = props.background;
  }
  return (
    <div className={"defaultTitle"}>
      <div className={"middleButton"} style={style}>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

FloatTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
