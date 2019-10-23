import React, {Component} from "react"
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile,} from 'ol/layer';
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
import {XYZ, OSM,TileImage,} from 'ol/source';
import {Projection} from 'ol/proj';
import {TiDiTuKey} from '../../common/common';
import {createXYZ}  from 'ol/tilegrid';


const height = document.body.clientHeight;
const width = document.body.clientWidth;

class GaoDeMap extends Component {
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    // 自定义分辨率和瓦片坐标系
    var resolutions = [];
    var maxZoom = 18;
    // 计算百度使用的分辨率
    for (var i = 0; i <= maxZoom + 1; i++) {
      resolutions[i] = Math.pow(2, maxZoom - i);
    }
    var tilegrid = new createXYZ({
      origin: [0, 0], // 设置原点坐标
      resolutions: resolutions // 设置分辨率
    });
    // 创建百度行政区划
    var baiduSource = new TileImage({
      tileGrid: tilegrid,
      tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];
        // 百度瓦片服务url将负数使用M前缀来标识
        if (x < 0) {
          x = 'M' + (-x);
        }
        if (y < 0) {
          y = 'M' + (-y);
        }
        // return "http://online0.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20170115&scaler=1&p=1";
        //street
        return 'http://online' + parseInt(Math.random() * 10) + '.map.bdimg.com/onlinelabel/?qt=tile&x=' +
          x + '&y=' + y + '&z=' + z + '&styles=pl&udt=20170620&scaler=1&p=1';
      }
    });
    // 百度影像
    var baiduSourceRaster= new TileImage({
      tileGrid: tilegrid,
      tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];
        // 百度瓦片服务url将负数使用M前缀来标识
        if (x < 0) {
          x = 'M' + (-x);
        }
        if (y < 0) {
          y = 'M' + (-y);
        }
        return 'http://shangetu' + parseInt(Math.random() * 10) + '.map.bdimg.com/it/u=x=' + x +
          ';y=' + y + ';z=' + z + ';v=009;type=sate&fm=46&udt=20170606';
      }
    });
    // 百度标注
    var baiduSourceLabel = new TileImage({
      tileGrid: tilegrid,
      tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];
        // 百度瓦片服务url将负数使用M前缀来标识
        if (x < 0) {
          x = 'M' + (-x);
        }
        if (y < 0) {
          y = 'M' + (-y);
        }
        return 'http://online' + parseInt(Math.random() * 10) + '.map.bdimg.com/onlinelabel/?qt=tile&x=' +
          x + '&y=' + y + '&z=' + z + '&styles=sl&udt=20170620&scaler=1&p=1';
      }
    });
    // 百度行政区划
    var baiduMapLayer = new Tile({
      source: baiduSource
    });
    // 百度地图标注
    var baiduMapLayerLabel = new Tile({
      source: baiduSourceLabel
    });
    //百度地图影像
    var baiduRasterLayer = new Tile({
      source: baiduSourceRaster
    });
    //谷歌行政区划
    var googleMapLayer = new Tile({
      source: new XYZ({
        url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
      })
    });
    //谷歌影像
    var googleRasterLayer = new Tile({
      source: new TileImage({ url: 'http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G' }),
      visible: false
    });

    var GisMap = new Map({
      interactions: defaultInteractions().extend([
        //拖拽旋转
        new DragRotateAndZoom()
      ]),
      layers: [
        // baiduRasterLayer,
        // googleRasterLayer,
        // googleMapLayer
        // baiduMapLayer,
        // baiduMapLayerLabel
      ],
      view: new View({
        center: [118.803805, 32.064241],
        zoom: 8
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
