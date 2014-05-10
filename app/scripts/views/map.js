'use strict';

define([
  'backbone',
  'cartodb',
  'views/layer',
  'text!../../queries/transports/metro.pgsql',
  'text!../../queries/transports/buses.pgsql',
  'text!../../queries/transports/trains.pgsql',
  'text!../../queries/transports/airports.pgsql'
], function(Backbone, cartodbLib, LayerView, metroQuery, busesQuery, trainsQuery, airportsQuery) {

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      tiles: 'https://cartocdn_c.global.ssl.fastly.net/base-dark/{z}/{x}/{y}.png',
      center: [40, -3],
      zoom: 6
    },

    initialize: function() {
      this.createMap();
      this.setTiles();

      this.metroLayer = new LayerView();
      this.busesLayer = new LayerView();
      this.trainsLayer = new LayerView();
      this.airportsLayer = new LayerView();

      Backbone.Events.on('layer:metro', this.setMetroLayer, this);
      Backbone.Events.on('layer:buses', this.setBusesLayer, this);
      Backbone.Events.on('layer:trains', this.setTrainsLayer, this);
      Backbone.Events.on('layer:airports', this.setAirportsLayer, this);
    },

    createMap: function() {
      this.map = L.map(this.el).setView(this.options.center, this.options.zoom);
    },

    setTiles: function() {
      this.tiles = L.tileLayer(this.options.tiles).addTo(this.map);
    },

    setMetroLayer: function() {
      if (this.metroLayer.layer) {
        this.metroLayer.removeLayer();
      } else {
        this.metroLayer.setLayer(this.map, {
          sql: metroQuery,
          cartocss: '#metro {marker-fill: #ff0000;}'
        });
      }
    },

    setBusesLayer: function() {
      if (this.busesLayer.layer) {
        this.busesLayer.removeLayer();
      } else {
        this.busesLayer.setLayer(this.map, {
          sql: busesQuery,
          cartocss: '#autobuses_urbanos {marker-fill: #ffff00;}'
        });
      }
    },

    setTrainsLayer: function() {
      if (this.trainsLayer.layer) {
        this.trainsLayer.removeLayer();
      } else {
        this.trainsLayer.setLayer(this.map, {
          sql: trainsQuery,
          cartocss: '#tren_cercanias {marker-fill: #00ff00;}'
        });
      }
    },

    setAirportsLayer: function() {
      if (this.airportsLayer.layer) {
        this.airportsLayer.removeLayer();
      } else {
        this.airportsLayer.setLayer(this.map, {
          sql: airportsQuery,
          cartocss: '#airports {marker-fill: #0000ff;}'
        });
      }
    }

  });

  return MapView;

});
