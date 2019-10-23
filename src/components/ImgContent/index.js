import React, {Component} from 'react';
import './style.less';
import PropTypes from 'prop-types';

export default class ImgContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const {imgUrl, width, imgHeight, imgWidth,} = this.props;

    const imgStyle = {
      // width: '100%',
    };

    if (imgHeight) {
      imgStyle.height = imgHeight;
    }
    if (imgWidth) {
      imgStyle.width = imgWidth;
    }
    return (
      <div style={{width: width, margin: '0 auto', textAlign: 'center',}}>
        <img src={imgUrl} style={imgStyle}/>
      </div>
    )
  }
}


ImgContent.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  width: PropTypes.string,
  imgWidth: PropTypes.string,

};
