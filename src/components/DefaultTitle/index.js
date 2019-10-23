import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';

/**
 * 标题
 * @param props
 * @returns {*}
 * @constructor
 */
export default function DefaultTitle(props) {

  return (
    <div className={"defaultTitle"}>
      <div className={"middleButton"}>
        <span style={{marginRight: 15}}>{props.title}</span>
      </div>
    </div>
  )
}

DefaultTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
