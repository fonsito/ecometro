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
      center: [40.384212768155045, -3.6529541015625],
      zoom: 8
    },

    initialize: function() {
      var self = this;

      this.createMap();
      this.setTiles();

      this.metroLayer = new LayerView();
      this.busesLayer = new LayerView();
      this.trainsLayer = new LayerView();
      this.airportsLayer = new LayerView();

      this.greenPointsLayer = new LayerView();
      this.landFillsLayer = new LayerView();
      this.sewagePlantsLayer = new LayerView();

      Backbone.Events.on('layer:metro', this.setMetroLayer, this);
      Backbone.Events.on('layer:buses', this.setBusesLayer, this);
      Backbone.Events.on('layer:trains', this.setTrainsLayer, this);
      Backbone.Events.on('layer:airports', this.setAirportsLayer, this);

      Backbone.Events.on('layer:greenpoints', this.setGreenPointsLayer, this);
      Backbone.Events.on('layer:landfills', this.setLandfillsLayers, this);
      Backbone.Events.on('layer:sewageplants', this.setSewagePlants, this);

      this.map.on('click', function(e) {
        self.onClick(e);
      });
    },

    createMap: function() {
      this.map = L.map(this.el).setView(this.options.center, this.options.zoom);
      window.map = this.map;
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
    },

    setGreenPointsLayer: function() {
      if (this.greenPointsLayer.layer) {
        this.greenPointsLayer.removeLayer();
      } else {
        this.greenPointsLayer.setLayer(this.map, {
          sql: airportsQuery,
          cartocss: '#airports {marker-fill: #0000ff;}'
        });
      }
    },

    setLandfillsLayers: function() {
      if (this.landFillsLayer.layer) {
        this.landFillsLayer.removeLayer();
      } else {
        this.landFillsLayer.setLayer(this.map, {
          sql: airportsQuery,
          cartocss: '#airports {marker-fill: #0000ff;}'
        });
      }
    },

    setSewagePlants: function() {
      if (this.sewagePlantsLayer.layer) {
        this.sewagePlantsLayer.removeLayer();
      } else {
        this.sewagePlantsLayer.setLayer(this.map, {
          sql: airportsQuery,
          cartocss: '#airports {marker-fill: #0000ff;}'
        });
      }
    },

    onClick: function(e) {
      if (this.location) {
        this.map.removeLayer(this.location);
      }
      this.location = L.marker(e.latlng);
      this.location.addTo(this.map);

      Backbone.Events.trigger('location', e.latlng);
    }

  });

  return MapView;

});
