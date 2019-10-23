import React, {Component} from "react"
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile,} from 'ol/layer';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
import {XYZ, OSM,} from 'ol/source';
import {Projection, fromLonLat,} from 'ol/proj';
import {TiDiTuKey} from '../../common/common';

const height = document.body.clientHeight;
const width = document.body.clientWidth;

class GaoDeMap extends Component {
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    var GisMap = new Map({
      interactions: defaultInteractions().extend([
        //拖拽旋转
        new DragRotateAndZoom()
      ]),
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([118, 32.82]),
        zoom: 6
      }),
      target: 'map',
    });

  }

  render() {
    // 1.创建地图容器
    return (
      <div id="map" className="map" style={{height, width}}/>
    )
  }

}

export default GaoDeMap;
