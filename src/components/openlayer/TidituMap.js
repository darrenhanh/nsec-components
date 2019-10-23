import React, {Component} from "react"
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile,} from 'ol/layer';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
import {XYZ, OSM,} from 'ol/source';
// import {TianMap} from  '../../common/TianDiTu';
import {Projection} from 'ol/proj';
import {TiDiTuKey} from '../../common/common';

var ol = require('ol');

const height = document.body.clientHeight;
const width = document.body.clientWidth;

/**
 * 天地图底图
 */
class Main extends Component {
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    //天地图底图
    var source = new XYZ({
      url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" + TiDiTuKey,
      // url:"http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk="+TiDiTuKey,
    });
    var tileLayer = new Tile({
      title: "天地图",
      source: source
    });
    //标注图层
    var sourceMark = new XYZ({url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + TiDiTuKey});//01648a46241de4244d518d8e151b3528
    var tileMark = new Tile({
      title: "标注图层",
      source: sourceMark,

    });
    //卫星图像
    var sourceSatellite = new XYZ({url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + TiDiTuKey});
    var tileSatellite = new Tile({
      title: "卫星图",
      source: sourceSatellite

    });
    var projection = new Projection({
      code: 'EPSG:4326',
      units: 'degrees'
    });
    var map = new Map({
        layers: [
          tileLayer,
          tileMark
        ],
        view: new View({
          zoom: 11,
          projection: projection,
          center: [118.803805, 32.064241],
          //ol.proj.transform( [116.40769, 39.89945], 'EPSG:4326', 'EPSG:3857')
        }),
        target: 'map'
      })
    ;
  }

  render() {
    // 1.创建地图容器
    return <div id="map" className="map" style={{height, width}}/>
  }

}

export default Main;
