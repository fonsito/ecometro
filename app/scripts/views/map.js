'use strict';

define([
  'backbone',
  'cartodb',
  'views/layer'
], function(Backbone, cartodbLib, LayerView) {

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      tiles: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      center: [40, -3],
      zoom: 13
    },

    initialize: function() {
      this.createMap();
      this.setTiles();

      this.metroLayer = new LayerView();
    },

    createMap: function() {
      this.map = L.map(this.el).setView(this.options.center, this.options.zoom);
    },

    setTiles: function() {
      this.tiles = L.tileLayer(this.options.tiles).addTo(this.map);
    },

    setMetroLayer: function() {
      this.metroLayer.setLayer(this.map, {
        sql: require(['text!../queries/metro.pgsql']),
        cartocss: '#metroligero {marker-fill: #F0F0F0;}'
      });
    }

  });

  return MapView;

});
