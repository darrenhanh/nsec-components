import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Radio} from 'antd';

export default function SwitchButton(props) {
  const style = {};
  const buttonList = props.buttonList.map((button) =>
    <Radio.Button value={button.key}>{button.name}</Radio.Button>
  );

  function onChange(e) {
    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <Radio.Group defaultValue={props.defaultValue} buttonStyle="solid" onChange={(e) => onChange(e)}>
      {buttonList}
    </Radio.Group>
  )
}

SwitchButton.propTypes = {
  buttonList: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};
