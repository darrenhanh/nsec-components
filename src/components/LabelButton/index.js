import React, {Component} from 'react'
import {geteleColor} from '../../common/eleColorEx'
import './style.less';

export default class LabelButton extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }
  render() {
    let {name, value, width} = this.props;
    value = value ? value : '';
    let color = geteleColor(name, value);
    const labelButton = {
      width: 60,
    };
    if (width) {
      labelButton.width = width;
    }
    return (
      <div className={'labelButton'} style={labelButton}>
        <div className={'name'} style={{
          background: color,
          color: color === '#feff01' ? 'black' : 'white'
        }}>{name}</div>
        <div className={'value'}>{value}</div>
      </div>
    )
  }
}

