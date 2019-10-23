import React, {Component} from 'react'
import {DatePicker} from 'antd';

const {RangePicker,} = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default function SimpleRangePicker(props) {

  return (
    <RangePicker onChange={onChange}/>
  )
}
