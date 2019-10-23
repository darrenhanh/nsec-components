import React, {Component} from "react"
import {Tile,} from 'ol/layer';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
import {XYZ, OSM,} from 'ol/source';
import {Projection} from 'ol/proj';
import {TiDiTuKey} from '../../common/common';
import {LayerSwitcher, MousePosition, ScaleLine, Scale,} from 'ol/control';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

const height = document.body.clientHeight;
const width = document.body.clientWidth;


var map = new Map({
  target: 'map',
  view: new View({
    projection: 'EPSG:3857', //HERE IS THE VIEW PROJECTION
    center: [0, 0],
    zoom: 2
  }),
  layers: [
    new TileLayer({
      source: new TileWMS({
        projection: 'EPSG:4326', //HERE IS THE DATA SOURCE PROJECTION
        url: 'http://demo.boundlessgeo.com/geoserver/wms',
        params: {
          'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
        }
      })
    })
  ]
});

class GaoDeMap extends Component {
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    var gaodeMapLayer = new Tile({
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
      })
    });

    let tileLayer = new TileWMS({
      projection: 'EPSG:3857', //HERE IS THE DATA SOURCE PROJECTION
      url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
      // url:'https://ahocevar.com/geoserver/wms',
      params: {
        'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
      }
    });

    /* let imgLayer=new Tile({
       source: new XYZ({
         url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}'
       })
     });*/

    var map = new Map({
      layers: [gaodeMapLayer,],
      view: new View({
        center: [118.803805, 32.064241],
        projection: 'EPSG:4326',
        // projection: projection,
        zoom: 10
      }),
      target: 'map'
    });

    /*  var vecLayer = new XYZ("高德矢量", [
        "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${x}&y=${y}&z=${z}",
        "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${x}&y=${y}&z=${z}",
        "http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${x}&y=${y}&z=${z}",
        "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=${x}&y=${y}&z=${z}"
      ], {
        isBaseLayer: true,
        visibility: true,
        displayInLayerSwitcher: true
      });
      var imgLayer = new XYZ("高德栅格", [
        "http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}",
        "http://webst02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}",
        "http://webst03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}",
        "http://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x=${x}&y=${y}&z=${z}"
      ], {
        isBaseLayer: true,
        visibility: true,
        displayInLayerSwitcher: true
      });


      let map = new Map( {
        projection: "EPSG:3857",
        displayProjection: "EPSG:4326",
        units: 'm',
        layers: [vecLayer, imgLayer],
        numZoomLevels: 20,
        center: [12958238.665397, 4882368.6569168],
        zoom: 9,
        target:"map",

      });*/
    // map.addControl(new LayerSwitcher());
    // map.addControl(new MousePosition());

    // map.addControl(new ScaleLine());
    // map.addControl(new OpenLayers.Control.Scale);
  }

  render() {
    // 1.创建地图容器
    return (
      <div id="map" className="map" style={{height, width}}/>
    )
  }

}

export default GaoDeMap;
