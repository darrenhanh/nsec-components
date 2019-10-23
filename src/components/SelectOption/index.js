import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select,} from 'antd';

const {Option} = Select;
export default function SelectOption(props) {
  const style = {};
  const optionList = props.optionList.map((button) =>
    <Option key={button.key} value={button.key}>{button.name}</Option>
  );

  function onChange(e) {
    if (props.onChange) {
      props.onChange(e);
    }
  }

  return (
    <Select defaultValue={props.defaultValue} style={{minWidth: 120}} onChange={(e) => onChange(e)}>
      {optionList}
    </Select>
  )
}

SelectOption.propTypes = {
  optionList: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};
