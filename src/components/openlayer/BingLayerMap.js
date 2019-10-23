import React, {Component} from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';

const height = document.body.clientHeight;
const width = document.body.clientWidth;

export default class BingLayerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    var styles = [
      'RoadOnDemand',
      'Aerial',
      'AerialWithLabelsOnDemand',
      'CanvasDark',
      'OrdnanceSurvey'
    ];
    var layers = [];
    var i, ii;
    for (i = 0, ii = styles.length; i < ii; ++i) {
      layers.push(new TileLayer({
        visible: false,
        preload: Infinity,
        source: new BingMaps({
          key: '换成自己的key http://www.bingmapsportal.com/ here',
          imagerySet: styles[i]
        })
      }));
    }
    var map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        // center: [-6655.5402445057125, 6709968.258934638],
        center: [0, 0],
        zoom: 13
      })
    });
    // var select = document.getElementById('layer-select');
    // var select =    this.refs.select;
    /* var select = document.getElementById('layer-select');

     select.addEventListener('change', onChange);*/
    // onChange();
    // function onChange() {
    //   var style = select.value;
    //   for (var i = 0, ii = layers.length; i < ii; ++i) {
    //     layers[i].setVisible(styles[i] === style);
    //   }
    // }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div>
        <div id="map" className="map" style={{height, width}}/>

        <select id="layer-select" ref={"select"}>
          <option value="Aerial">Aerial</option>
          <option value="AerialWithLabelsOnDemand" selected>Aerial with labels</option>
          <option value="RoadOnDemand">Road</option>
          <option value="CanvasDark">Road dark</option>
          <option value="OrdnanceSurvey">Ordnance Survey</option>
        </select>
      </div>

    )
  }
}

