'use strict';

define([
  'backbone',
  'cartodb'
], function(Backbone, cartodbLib) {

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
    },

    createMap: function() {
      this.map = L.map(this.el).setView(this.options.center, this.options.zoom);
    },

    setTiles: function() {
      this.tiles = L.tileLayer(this.options.tiles).addTo(this.map);
    }

  });

  return MapView;

});
