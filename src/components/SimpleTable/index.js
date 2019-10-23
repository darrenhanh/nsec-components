import PropTypes from "prop-types";
import React, {Component} from 'react';
import {Icon} from 'antd';
import './style.less';

export default class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realTbody: this.props.tbody,
    };
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this.refs.table);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({realTbody: nextProps.tbody,});
  }

  sort(type) {
    let {realTbody} = this.state;
    if (type === 1) {
      realTbody = realTbody.sort((a, b) => a[0] - b[0]);
    } else {
      realTbody = realTbody.sort((a, b) => b[0] - a[0]);
    }
    this.setState({realTbody});
  }

  rowClick(ii, index) {
    if (this.props.rowClick) {
      this.props.rowClick(ii, index);
    }
  }

  render() {
    const {realTbody} = this.state;
    const {showSort, size, rowIx,} = this.props;

    let thead;
    if (this.props.thead) {
      thead =
        (
          <tr>
            {
              this.props.thead.map((ii, index) =>
                <th key={ii + "_" + index}>
                  {
                    index === 0 && showSort ?
                      <>
                        <div style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          marginTop: 2,
                        }}>
                          {ii}
                        </div>
                        <div className={"upDown"}>
                          <Icon type="up" onClick={() => this.sort(1)}/>
                          <Icon type="down" onClick={() => this.sort(-1)}/>
                        </div>
                      </>
                      :
                      <>
                        {ii}
                      </>
                  }
                </th>)
            }
          </tr>
        );
    }
    if (this.props.theadContent) {
      thead = this.props.theadContent;
    }
    // cursor: pointer;
    const trStyle = (index) => {
      return {background: rowIx === index ? "rgb(230,247,255)" : "none",};//"rgb(242,246,247)"
    };

    const tbody = realTbody.map((ii, index) =>
      <tr key={ii + "_" + index} onClick={() => this.rowClick(ii, index)}
          style={trStyle(index)}>
        {
          ii.map((oo, index) =>
            <td key={oo + "_" + index}>{oo}</td>
          )
        }
      </tr>);
    const tbodyStyle = {
      maxHeight: 500,
    };
    if (this.props.maxHeight) {
      tbodyStyle.maxHeight = this.props.maxHeight;
    }
    let theadClass = "defaultThead";

    if (size) {
      if (size === 'small') {
        theadClass = 'smallThead';
      } else if (size === 'large') {
        theadClass = 'largeThead';
      }
    }
    return (
      <table className={"simpleTable"} ref={"table"}>
        <thead className={theadClass}>
        {thead}
        </thead>
        <tbody style={tbodyStyle}>
        {tbody}
        </tbody>
      </table>
    )
  }
}

SimpleTable.propTypes = {
  tbody: PropTypes.array.isRequired,
  thead: PropTypes.array,
  theadContent: PropTypes.object,
  maxHeight: PropTypes.number,
  rowClick: PropTypes.func,
};
