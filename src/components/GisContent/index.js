import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class GisContent extends Component {
  gisContent = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {height, src,} = this.props;
    return (
      <iframe ref={this.gisContent} src={src}
              style={{width: '100%', height: height, border: 0}}/>
    )
  }
}

GisContent.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};
