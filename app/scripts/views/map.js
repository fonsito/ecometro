'use strict';

define([
  'backbone',
  'cartodb',
  'views/layer',
  'text!../../queries/metro.pgsql'
], function(Backbone, cartodbLib, LayerView, metroQuery) {

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      tiles: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      center: [40, -3],
      zoom: 6
    },

    initialize: function() {
      this.createMap();
      this.setTiles();

      this.metroLayer = new LayerView();

      this.setMetroLayer();
    },

    createMap: function() {
      this.map = L.map(this.el).setView(this.options.center, this.options.zoom);
    },

    setTiles: function() {
      this.tiles = L.tileLayer(this.options.tiles).addTo(this.map);
    },

    setMetroLayer: function() {
      this.metroLayer.setLayer(this.map, {
        sql: metroQuery,
        cartocss: '#metro {marker-fill: #ff0000;}'
      });
    }

  });

  return MapView;

});
